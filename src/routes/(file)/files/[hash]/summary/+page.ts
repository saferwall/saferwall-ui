import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { client } = await parent();

	const summary = await client.getFileSummary(params.hash);
	return {
		summary
	};
}) satisfies PageLoad;
