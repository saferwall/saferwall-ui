import { SaferwallClient } from '$lib/clients/saferwall';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, fetch }) => {
	const { session, gotoApp } = await parent();
	return {
		client: new SaferwallClient(session, fetch),
		gotoApp
	};
};
