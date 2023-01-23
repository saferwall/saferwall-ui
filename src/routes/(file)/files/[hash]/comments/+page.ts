import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import type { APIPagination } from '$lib/types/pagination';
import type { APIComment } from '$lib/types/comments';
import type { PageLoad } from './$types';

export const load = (async ({ params }): Promise<{
    pagination: APIPagination<APIComment>,
}> => {
    const { hash } = params;

    const initReq: { cache?: RequestCache | undefined } = {};
    if (browser) {
        initReq.cache = "force-cache";
    }

    const fileReq = await fetch(`${env.PUBLIC_API_URL}/files/${hash}/comments`, initReq);

    const pagination = await fileReq.json();

    return {
        pagination
    };

}) satisfies PageLoad;