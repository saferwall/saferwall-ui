import { SaferwallClient } from '$lib/clients/saferwall';
import type { APIFile } from '$lib/types/files';
import type { PageLoad } from './$types';

export const load = (async ({
	params
}): Promise<{
	richHeader: any;
}> => {
	const { hash } = params;

	const { pe } = await new SaferwallClient().request<APIFile>(
		`files/${hash}?fields=pe.rich_header`
	);

	return {
		richHeader: pe.rich_header
	};
}) satisfies PageLoad;
