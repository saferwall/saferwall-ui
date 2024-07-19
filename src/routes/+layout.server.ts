import type { Saferwall } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({
	locals
}): Promise<{
	user: Saferwall.User;
	session: Saferwall.Session;
}> => {
	return {
		user: locals.user,
		session: locals.session
	};
}) satisfies LayoutServerLoad;
