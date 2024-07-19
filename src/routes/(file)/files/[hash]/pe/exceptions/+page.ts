import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { pe } = await new SaferwallClient().request<Saferwall.File>(
		`files/${params.hash}?fields=pe.exception`
	);

	return {
		exceptions: pe.exception
	};
}) satisfies PageLoad;
