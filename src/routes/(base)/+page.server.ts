import { SaferwallClient } from '$lib/clients/saferwall';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const pagination: any = await new SaferwallClient(locals.session).getActivities();

	return {
		session: locals.session,
		user: locals.user,
		pagination
	};
}) satisfies PageServerLoad;
