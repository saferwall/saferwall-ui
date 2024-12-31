import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { Plugin } from 'vite';
import { OutputBundle, OutputAsset, OutputOptions } from 'rollup';
import postcssLoadConfig from 'postcss-load-config';
import customPostcssPlugin from "./src/validate";
import { Resvg } from "@resvg/resvg-js";

function escapeForRegex(str: string): string {
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function patchHtmlAndMergeWithCssPlugin(): Plugin {
	return {
		name: 'vite-plugin-email-compat',
		enforce: 'post',
		apply: 'build',
		async generateBundle(_options: OutputOptions, bundle: OutputBundle) {
			let toDelete: string[] = [];
			for (let fileName in bundle) {
				const chunk = bundle[fileName];
				fileName = chunk.fileName = chunk.fileName.replace("src/", "");
				// Process only HTML files
				if (chunk.type === 'asset' && fileName.endsWith('content.html')) {
					let htmlContent = chunk.source as string;
					
					// Find CSS files and inline their content
					const cssAssets = Object.entries(bundle).filter(
						([_, asset]) =>
							asset.type === 'asset' && asset.fileName.endsWith('.css')
					);

					for (const [cssFileName, cssAsset] of cssAssets) {
						const cssString = (cssAsset as OutputAsset).source as string;

						// Create a <style> tag with the CSS content
						const styleTag = `<style>${cssString}</style>`;

						// Inline the <style> tag into the HTML
						htmlContent = htmlContent.replace(
							new RegExp(`<link[^>]*href=["']\\/?${escapeForRegex(cssFileName)}["'][^>]*>`, 'g'),
							styleTag
						);

						// Remove the CSS file from the output bundle
						toDelete.push(cssFileName)
					}

					// insert a second head to compensate for common bug in how email providers handle css
					// we're talking google, microsoft, big names doing stupid and unnecessary things
					// insert a third for the Inter font for the clients that support it
					htmlContent = htmlContent.replace(/<html [^>]*>/, `$&<head></head>`);
					
					// gmail doesn't support escaped characters in classnames...
					htmlContent = htmlContent.replace(/class="([^"]*?)"/g, (match, classNames: string) => {
						const updatedClassNames = classNames
							.split(' ')
							.map((cls) => cls.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '__'))
							.join(' ');
						return `class="${updatedClassNames}"`;
					});
					
					// turn svgs into base64 pngs
					htmlContent = htmlContent.replace(/(?:"data:image\/svg\+xml,)([^"]*)(?:"\s+class="(?:size|w)-)([0-9]+)(?:)/g, (match, svgEncoded, size) => {
						const multiplier = 2;
						let widthInPx = size ? parseInt(size) * 4 * multiplier : 512;
						let svgString = decodeURIComponent(svgEncoded);
						let resvg = new Resvg(svgString, {
							fitTo: {
								mode: "width",
								value: widthInPx,
							},
							dpi: 300,
						});
						let pngData = resvg.render();
						let pngBuffer = pngData.asPng();
						let pngBase64url = "data:image/png;base64," + pngBuffer.toString("base64");
						// console.log({svgString, widthInPx, pngBase64url});
						return match.replace(/"data:[^"]*"/, `"${pngBase64url}"`);
					})

					// Update the HTML file content in the bundle
					chunk.source = htmlContent;
				} else if (chunk.type === 'asset' && fileName.endsWith('text.html')) {
					bundle[chunk.fileName = fileName.replace("text.html", "content.txt")] = chunk;
					delete bundle[fileName];
				}
			}
			toDelete.forEach(e => {
				delete bundle[e];
			})
		},
	};
}

const inputs = [
	"account-confirmation",
	"email-update",
	"password-reset",
]

const ejsVars = {
	support_email: `{{ .SupportEmail }}`,
	email: `{{ .Email }}`,
	username: `{{ .Username }}`,
	token: `{{ .Token }}`,
	guid: `{{ .Guid }}`,
	get reset_password_link() {
		return `https://saferwall.com/app/auth/forgot-password/new?token={{ .Token }}&guid={{ .Guid }}&id={{ .Email }}`;
	},
	get verify_account_link() {
		return `https://saferwall.com/app/auth/confirm/verify?token={{ .Token }}&guid={{ .Guid }}&id={{ .Email }}`;
	},
	get update_email_link() {
		return `https://saferwall.com/app/auth/confirm/verify?token={{ .Token }}&guid={{ .Guid }}&id={{ .Email }}`;
	},
}

export default defineConfig(async ({command}) => {
	return {
		plugins: [
			ViteEjsPlugin(ejsVars),
			patchHtmlAndMergeWithCssPlugin(),
		],
		build: {
			rollupOptions: {
				input: Object.fromEntries(inputs.map(input => {
					return [
						[input + ".html", resolve(__dirname, `src/${input}/content.html`)],
						[input + ".txt", resolve(__dirname, `src/${input}/text.html`)],
					];
				}).flat()),
	
			},
		},
		css: {
			postcss: {
				plugins: [
					...(await postcssLoadConfig()).plugins,
					...(command === "build" ? [ customPostcssPlugin ] : [])
				],
			}
		},
		clearScreen: false,
	}
});
