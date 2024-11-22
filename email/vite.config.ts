import { defineConfig } from "vite";
import { resolve } from "path";
import inlineSource from "vite-plugin-inline-source";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { Plugin } from 'vite';
import { OutputBundle, OutputAsset, OutputOptions } from 'rollup';

function escapeForRegex(str: string): string {
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function inlineCssPlugin(): Plugin {
	return {
		name: 'vite-plugin-inline-css',
		enforce: 'post',
		apply: 'build',
		async generateBundle(_options: OutputOptions, bundle: OutputBundle) {
			let toDelete: string[] = [];
			for (let fileName in bundle) {
				const chunk = bundle[fileName];
				fileName = chunk.fileName = chunk.fileName.replace("src/", "");
				// Process only HTML files
				if (chunk.type === 'asset' && fileName.endsWith('content.html')) {
					let htmlContent = (chunk as OutputAsset).source as string;
					
					// Find CSS files and inline their content
					const cssAssets = Object.entries(bundle).filter(
						([_, asset]) =>
							asset.type === 'asset' && asset.fileName.endsWith('.css')
					);

					for (const [cssFileName, cssAsset] of cssAssets) {
						const cssContent = (cssAsset as OutputAsset).source as string;

						// Create a <style> tag with the CSS content
						const styleTag = `<style>${cssContent}</style>`;

						// Inline the <style> tag into the HTML
						htmlContent = htmlContent.replace(
							new RegExp(`<link[^>]*href=["']\\/?${escapeForRegex(cssFileName)}["'][^>]*>`, 'g'),
							styleTag
						);

						// Remove the CSS file from the output bundle
						toDelete.push(cssFileName)
					}

					// Update the HTML file content in the bundle
					(chunk as OutputAsset).source = htmlContent;
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
		return `https://saferwall.com/auth/forgot-password/new?tokeg={{ .Token }}&guid={{ .Guid }}&id={{ .Email }}`;
	},
	get verify_account_link() {
		return `https://saferwall.com/auth/confirm/verify?token={{ .Token }}&guid={{ .Guid }}&id={{ .Email }}`;
	}
}

export default defineConfig({
	plugins: [
		ViteEjsPlugin(ejsVars),
		inlineSource({}),
		inlineCssPlugin(),
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
});
