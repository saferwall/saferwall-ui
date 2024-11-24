import purgeHtml from "purgecss-from-html";

export default {
	plugins: {
		"tailwindcss/nesting": {},
		tailwindcss: {},
		autoprefixer: {},
		"@fullhuman/postcss-purgecss": {
			content: ["./**/*.html"],
			css: [ "./**/*.html"],
			extractCSS: false,
			variables: true,
			extractors: [
				{
					extractor: purgeHtml,
					extensions: ["html"],
				},
			],
		},
	}
};