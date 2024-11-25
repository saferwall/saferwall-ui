import { Plugin } from "postcss";
import postcss from "postcss";
import cssvariables from "postcss-css-variables";
import parse from "color-parse";
import colorString from "color-string";
import { AstRule, createParser } from 'css-selector-parser';

// from https://developers.google.com/gmail/design/css#supported_css
const gmail_allowed_properties = [
	"azimuth",
	"background",
	"background-blend-mode",
	"background-clip",
	"background-color",
	"background-image",
	"background-origin",
	"background-position",
	"background-repeat",
	"background-size",
	"border",
	"border-bottom",
	"border-bottom-color",
	"border-bottom-left-radius",
	"border-bottom-right-radius",
	"border-bottom-style",
	"border-bottom-width",
	"border-collapse",
	"border-color",
	"border-left",
	"border-left-color",
	"border-left-style",
	"border-left-width",
	"border-radius",
	"border-right",
	"border-right-color",
	"border-right-style",
	"border-right-width",
	"border-spacing",
	"border-style",
	"border-top",
	"border-top-color",
	"border-top-left-radius",
	"border-top-right-radius",
	"border-top-style",
	"border-top-width",
	"border-width",
	"box-sizing",
	"break-after",
	"break-before",
	"break-inside",
	"caption-side",
	"clear",
	"color",
	"column-count",
	"column-fill",
	"column-gap",
	"column-rule",
	"column-rule-color",
	"column-rule-style",
	"column-rule-width",
	"column-span",
	"column-width",
	"columns",
	"direction",
	"display",
	"elevation",
	"empty-cells",
	"float",
	"font",
	"font-family",
	"font-feature-settings",
	"font-kerning",
	"font-size",
	"font-size-adjust",
	"font-stretch",
	"font-style",
	"font-synthesis",
	"font-variant",
	"font-variant-alternates",
	"font-variant-caps",
	"font-variant-east-asian",
	"font-variant-ligatures",
	"font-variant-numeric",
	"font-weight",
	"height",
	"image-orientation",
	"image-resolution",
	"ime-mode",
	"isolation",
	"layout-flow",
	"layout-grid",
	"layout-grid-char",
	"layout-grid-char-spacing",
	"layout-grid-line",
	"layout-grid-mode",
	"layout-grid-type",
	"letter-spacing",
	"line-break",
	"line-height",
	"list-style",
	"list-style-position",
	"list-style-type",
	"margin",
	"margin-bottom",
	"margin-left",
	"margin-right",
	"margin-top",
	"marker-offset",
	"max-height",
	"max-width",
	"min-height",
	"min-width",
	"mix-blend-mode",
	"object-fit",
	"object-position",
	"opacity",
	"outline",
	"outline-color",
	"outline-style",
	"outline-width",
	"overflow",
	"overflow-x",
	"overflow-y",
	"padding",
	"padding-bottom",
	"padding-left",
	"padding-right",
	"padding-top",
	"page-break-after",
	"page-break-before",
	"page-break-inside",
	"pause",
	"pause-after",
	"pause-before",
	"pitch",
	"pitch-range",
	"quotes",
	"richness",
	"speak",
	"speak-header",
	"speak-numeral",
	"speak-punctuation",
	"speech-rate",
	"stress",
	"table-layout",
	"text-align",
	"text-align-last",
	"text-autospace",
	"text-combine-upright",
	"text-decoration",
	"text-decoration-color",
	"text-decoration-line",
	"text-decoration-skip",
	"text-decoration-style",
	"text-emphasis",
	"text-emphasis-color",
	"text-emphasis-style",
	"text-indent",
	"text-justify",
	"text-kashida-space",
	"text-orientation",
	"text-overflow",
	"text-transform",
	"text-underline-position",
	"unicode-bidi",
	"vertical-align",
	"voice-family",
	"white-space",
	"width",
	"word-break",
	"word-spacing",
	"word-wrap",
	"writing-mode",
	"zoom",
]

const processor = postcss([cssvariables()]);
const parseSelector = createParser({
	syntax: {
		baseSyntax: "progressive",
		pseudoClasses: {
			definitions: {
				Selector: ["host"],
				NoArgument: ["host"]
			}
		}
	}
});

const customPostcssPlugin: Plugin = {
	postcssPlugin: "custom-plugin",
	async Once(root) {
		console.log("");
		// replace light-dark css variable values with the light variant
		root.walkDecls((decl) => {
			if (decl.prop.startsWith("--")) {
				decl.value = decl.value.replace(/light-dark\((.*?),(.*?)\)/, "$1");
			}
		})
		// replace non-hex color values with their equivalent hex value
		root.walkRules((rule) => {
			rule.walkDecls((decl) => {
				let color = parse(decl.value);
				if (["rgb", "hsl"].includes(color.space)) {
					decl.value = colorString.to.hex(color.values);
				}
			});
		});
		// substitute all css variable references with their value and remove said css variable
		const cssText = (await processor.process(root.toString(), { from: undefined }).async()).css;
		const newRoot = postcss.parse(cssText, { from: "app.css" });
		root.removeAll();
		root.append(newRoot);
		// filter on allowed css selectors and properties
		root.walkRules((rule) => {
			function validRule(rule: AstRule): boolean {
				return rule.items.every(item => ["TagName", "WildcardTag", "Id", "ClassName"].includes(item.type)) && (!rule.nestedRule || validRule(rule.nestedRule));
			}
			let invalid = rule.selectors.filter(s => parseSelector(s).rules.every(rule => !validRule(rule)));
			rule.selectors = rule.selectors.filter(s => parseSelector(s).rules.every(rule => validRule(rule)));
			rule.selector = rule.selectors.join(",");
			// console.log({valid: rule.selectors, invalid});
			if (rule.selector === "") {
				rule.remove();
			} else {
				// replace characters that need to be escaped with double underscore
				rule.selector = rule.selector.replace(/\\([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '__');
				rule.walkDecls((decl) => {
					if (!gmail_allowed_properties.includes(decl.prop)) {
						// decl.remove();
						console.warn('\x1b[33m%s\x1b[0m', `property "${decl.prop}" might get ignored`)
					}
				})
				if (!rule.nodes.filter(n => n.type === "decl").length) {
					rule.remove();
				}
			}
		});
	},

};

export default customPostcssPlugin;