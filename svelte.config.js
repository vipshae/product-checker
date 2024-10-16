import adapter from '@sveltejs/adapter-static';
import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const staticAdapterConfig = {
		pages: 'build-static',
		assets: 'build-static',
		fallback: undefined,
		precompress: false,
		strict: true
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: process.env.ADAPTER === 'static' ? adapter(staticAdapterConfig) : vercel()
	}
};

export default config;
