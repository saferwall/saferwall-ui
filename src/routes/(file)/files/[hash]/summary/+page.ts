import { SaferwallClient } from '$lib/clients/saferwall';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { session } = await parent();

	const summary = await new SaferwallClient(session).getFileSummary(params.hash);

	return {
		summary
	};
}) satisfies PageLoad;
