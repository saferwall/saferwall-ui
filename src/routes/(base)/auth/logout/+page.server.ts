import { redirect } from '@sveltejs/kit';
import { SESSION_KEY } from '$lib/config';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, locals }: any) => {
    try {
        cookies.delete(SESSION_KEY, {
            httpOnly: true,
            secure: true,
            path: '/'
        });
        locals.session = null;
        locals.user = null;
    } catch (error) {
    }

    throw redirect(302, '/auth/login');
}) satisfies PageServerLoad;