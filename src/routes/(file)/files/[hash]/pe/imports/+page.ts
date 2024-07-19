import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({
	params
}): Promise<{
	imports: any[];
}> => {
	const { hash } = params;

	const { pe } = await new SaferwallClient().request<Saferwall.File>(
		`files/${hash}?fields=pe.import`
	);

	return {
		imports: pe.import
	};
}) satisfies PageLoad;
