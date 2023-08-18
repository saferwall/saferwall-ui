import { SaferwallClient } from '$lib/clients/saferwall';
import type { APIAntivirus } from '$lib/types/antivirus';
import type { APIFile } from '$lib/types/files';
import type { PageLoad } from './$types';

export const load = (async ({
	params
}): Promise<{
	antivirus: APIAntivirus;
}> => {
	const { hash } = params;

	const antivirus = await new SaferwallClient().request<APIAntivirus>(
		`files/${hash}?fields=multiav,first_seen,last_scanned`
	);

	return {
		antivirus
	};
}) satisfies PageLoad;
