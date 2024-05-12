import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { session } = await parent();

	const saferwall = new SaferwallClient(session);

	const summary = await saferwall.getFileSummary(params.hash);
	let behavior: Saferwall.Behaviors.DefaultReport | undefined;

	try {
		behavior = await saferwall.getDefaultBehaviorReport(params.hash);
	} catch (_error) {
		// No default behavior report
	}

	return {
		summary,
		behavior
	};
}) satisfies PageLoad;
