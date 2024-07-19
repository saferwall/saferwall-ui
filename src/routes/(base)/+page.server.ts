import { SaferwallClient } from '$lib/clients/saferwall';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const pagination = await new SaferwallClient(locals.session).getActivities();

	return {
		pagination,
		user: locals.user,
		session: locals.session
	};
}) satisfies PageServerLoad;
