import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params: { hash } }) => {
	const { pe } = await new SaferwallClient().request<Saferwall.File>(
		`files/${hash}?fields=pe.dos_header`
	);

	return {
		dosHeader: pe.dos_header
	};
}) satisfies PageLoad;
