import type { PageLoad } from './$types';
import type { Activity } from '$lib/types';
import type { APIPagination } from '$lib/types/pagination';
import { APIClient } from '$lib/api';

export const load = (async (): Promise<{
    pagination: APIPagination<Activity>
}> => {

    const pagination = await APIClient.request(`users/activities?per_page=10`);
    return {
        pagination
    };

}) satisfies PageLoad;