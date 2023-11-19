import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { hash } = params;

	const { pe } = await new SaferwallClient().request<Saferwall.File>(
		`files/${hash}?fields=pe.sections`
	);

	return {
		sections: pe.sections
	};
}) satisfies PageLoad;
