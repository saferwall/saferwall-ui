import { redirect } from '@sveltejs/kit';
import { SESSION_KEY } from '$lib/config';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, locals }) => {
	try {
		cookies.delete(SESSION_KEY, {
			httpOnly: true,
			secure: true,
			path: '/'
		});
		locals.session = undefined;
		locals.user = undefined;

		locals.client.removeSession();
	} catch (error) {}

	throw redirect(302, '/app/auth/login');
}) satisfies PageServerLoad;
