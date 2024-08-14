import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const ssr = false;
export const load = (async ({ params, parent }) => {
	const { client } = await parent();

	const { pe } = await client.request<Saferwall.File>(
		`files/${params.hash}?fields=pe.bound_import`
	);

	return {
		boundImport: pe.bound_import
	};
}) satisfies PageLoad;
