import { SaferwallClient } from '$lib/clients/saferwall';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, fetch, url }) => {
	const { session } = await parent();

	return {
		client: new SaferwallClient(session, fetch),
		strip: url.searchParams.get("strip") !== null
	};
};
