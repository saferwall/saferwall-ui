import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params: { hash }, parent }) => {
	const { client } = await parent();

	const { pe } = await client.request<Saferwall.File>(`files/${hash}?fields=pe.resource`);

	return {
		resource: pe.resource
	};
}) satisfies PageLoad;
