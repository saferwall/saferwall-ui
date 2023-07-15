import { SaferwallClient } from '$lib/clients/saferwall';
import type { APIFile } from '$lib/types/files';
import type { PageLoad } from './$types';

export const load = (async ({
	params
}): Promise<{
	dosHeader: any;
}> => {
	const { hash } = params;

	const { pe } = await new SaferwallClient().request<APIFile>(`files/${hash}?fields=pe.dos_header`);

	return {
		dosHeader: pe.dos_header
	};
}) satisfies PageLoad;
