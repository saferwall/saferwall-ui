import type { User } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ locals }): Promise<{
    user?: User
}> => {

    return {
        user: locals.user
    };

}) satisfies PageLoad;