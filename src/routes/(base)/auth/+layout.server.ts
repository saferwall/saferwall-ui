import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = ((event: any) => {
    const { locals, route } = event;

    // if logout
    if (event.url.pathname === '/auth/logout') {
        return {};
    }

    // if authentified redirect home page
    if (locals.user) {
        throw redirect(302, '/');
    }

    return {};
}) satisfies LayoutServerLoad;