import { APIClient } from '$lib/api';
import type { PageServerLoad } from './$types';
import type { Activity, User } from '$lib/types';
import type { APIPagination } from '$lib/types/pagination';

export const load = (async ({ locals }): Promise<{
    user?: User,
    pagination: APIPagination<Activity>
}> => {
    const pagination: any = await new APIClient(locals.session).getActivities();

    return {
        user: locals.user,
        pagination
    };

}) satisfies PageServerLoad;