import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const username = params.username!;
	const user = await new SaferwallClient(locals.session).getUser(username);

	return {
		profile: user,
		username: username,
		session: locals.session
	};
}) satisfies LayoutServerLoad;
