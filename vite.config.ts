import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type UserConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl"

export default defineConfig(({ mode }) => {
	let ret: UserConfig = {
		plugins: [sveltekit()],
		optimizeDeps: {
			exclude: [
				"codemirror",
				"@codemirror/lang-markdown",
				"@codemirror/commands",
				"@codemirror/lang-markdown",
				"@codemirror/language",
				"@codemirror/state",
				"@codemirror/view",
				"@uiw/codemirror-theme-vscode",
				"@lezer/highlight",
				"svelte-codemirror-editor",
			]
		},
	};
	if (mode === "development") {
		ret = {
			...ret,
			plugins: [...ret.plugins ?? [], basicSsl()],
			server: {
				origin: "https://saferwall.com",
				host: "saferwall.com",
				port: 443,
				proxy: {}
			}
		}
	}
	return ret;
});