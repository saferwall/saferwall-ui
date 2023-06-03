import dotenv from 'dotenv'
dotenv.config()

import adapterCloudFlare from '@sveltejs/adapter-cloudflare';
import adapterNode from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: process.env.ADAPTER === 'node'
		? adapterNode()
		: adapterCloudFlare(),
	}
};

export default config;
