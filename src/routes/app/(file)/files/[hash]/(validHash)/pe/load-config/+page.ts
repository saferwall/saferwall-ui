import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params: { hash }, parent }) => {
	const { client } = await parent();

	const { pe } = await client.request<Saferwall.File>(`files/${hash}?fields=pe.load_config`);

	return {
		loadConfig: pe.load_config
	};
}) satisfies PageLoad;
