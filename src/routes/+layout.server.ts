import { APP_VISITED_KEY } from '$lib/config';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, cookies }) => {
	return {
		user: locals.user,
		session: locals.session,
		gotoApp: cookies.get(APP_VISITED_KEY) === "true"
	};
}) satisfies LayoutServerLoad;
