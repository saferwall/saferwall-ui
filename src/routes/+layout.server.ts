import type { Session, User } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }): Promise<{
    user?: User,
    session?: Session
}> => {

    return {
        user: locals.user,
        session: locals.session
    };

}) satisfies LayoutServerLoad;