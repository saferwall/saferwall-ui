import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({
	params
}): Promise<{
	relocations: any[];
}> => {
	const { hash } = params;

	const { pe } = await new SaferwallClient().request<Saferwall.File>(
		`files/${hash}?fields=pe.reloc`
	);

	return {
		relocations: pe.reloc
	};
}) satisfies PageLoad;
