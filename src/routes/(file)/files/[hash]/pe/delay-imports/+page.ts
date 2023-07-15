import { SaferwallClient } from '$lib/clients/saferwall';
import type { APIFile } from '$lib/types/files';
import type { PageLoad } from './$types';

export const load = (async ({
	params
}): Promise<{
	items: any[];
}> => {
	const { hash } = params;

	const { pe } = await new SaferwallClient().request<APIFile>(
		`files/${hash}?fields=pe.delay_import`
	);

	return {
		items: pe.delay_import
	};
}) satisfies PageLoad;
