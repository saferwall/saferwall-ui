import { SaferwallClient } from '$lib/clients/saferwall';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, fetch }) => {
	const { session } = await parent();

	return {
		client: new SaferwallClient(session, fetch)
	};
};
