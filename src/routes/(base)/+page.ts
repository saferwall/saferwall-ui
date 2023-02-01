import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';
import type { Activity } from '$lib/types';
import type { APIPagination } from '$lib/types/pagination';

export const load = (async (): Promise<{
    pagination: APIPagination<Activity>
}> => {

    const initReq: { cache?: RequestCache | undefined } = {};
    if (browser) {
        initReq.cache = "force-cache";
    }

    const fileReq = await fetch(`${env.PUBLIC_API_URL}/users/activities?per_page=10`, initReq);

    const pagination = await fileReq.json();
    return {
        pagination
    };

}) satisfies PageLoad;