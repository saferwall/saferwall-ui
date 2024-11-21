import { defineConfig, HtmlTagDescriptor } from 'vite';
import { resolve } from "path";
import { createHtmlPlugin } from 'vite-plugin-html';
import inlineSource from "vite-plugin-inline-source";

const inputs = [
	"account-confirmation",
	"email-update",
	"password-reset",
]

export default defineConfig({
	plugins: [
		createHtmlPlugin({
			minify: false, // Optional: Minify the HTML
			pages: inputs.map(input => {
				return {
					template: resolve(__dirname, `src/${input}/content.html`),
					filename: resolve(__dirname, `build/${input}.html`),
					injectOptions: {
						tags: [
							{
								tag: 'style',
								attrs: {},
								injectTo: 'head',
								children: ""
							}
						]
					}
				}
			})
		}),
		inlineSource({})
	]
	// build: {
	// 	rollupOptions: {
	// 		input: Object.fromEntries(inputs.map(input => {
	// 			return [input, resolve(__dirname, `src/${input}/content.html`)];
	// 		})),
	// 	},
	// },
	// css: {
	// 	postcss: {

	// 	}
	// }
});
