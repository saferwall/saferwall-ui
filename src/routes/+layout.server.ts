import type { User } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }): Promise<{
    user?: User
}> => {

    return {
        user: locals.user,
        session: locals.session
    };

}) satisfies LayoutServerLoad;