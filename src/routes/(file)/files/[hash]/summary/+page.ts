import { SaferwallClient } from '$lib/clients/saferwall';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const parentData = await parent();

	const { hash } = params;

	const summary = await new SaferwallClient(parentData.session).getFileSummary(hash);

	return {
		summary
	};
}) satisfies PageLoad;
