import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { hash } = params;

	const { pe } = await new SaferwallClient().request<Saferwall.File>(
		`files/${hash}?fields=pe.load_config`
	);

	return {
		loadConfig: pe.load_config
	};
}) satisfies PageLoad;
