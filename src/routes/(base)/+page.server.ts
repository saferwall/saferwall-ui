import { APIClient } from '$lib/api';
import type { PageLoad } from './$types';
import type { Activity, User } from '$lib/types';
import type { APIPagination } from '$lib/types/pagination';

export const load = (async ({ locals }): Promise<{
    user?: User,
    pagination: APIPagination<Activity>
}> => {

    const pagination: any = await APIClient.request(`users/activities?per_page=10`);
    return {
        user: locals.user,
        pagination
    };

}) satisfies PageLoad;