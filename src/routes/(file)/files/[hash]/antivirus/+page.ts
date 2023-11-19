import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { hash } = params;

	const antivirus = await new SaferwallClient().request<Saferwall.Antivirus>(
		`files/${hash}?fields=multiav,first_seen,last_scanned`
	);

	return {
		antivirus
	};
}) satisfies PageLoad;
