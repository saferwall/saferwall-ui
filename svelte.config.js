import adapterNode from '@sveltejs/adapter-node';
import adapterAuto from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: (process.env?.NODE_ADAPTER ? adapterNode : adapterAuto)(),
		csrf: {
			checkOrigin: !(process.env.NODE_ENV === "development")
		}
	}
};

export default config;
