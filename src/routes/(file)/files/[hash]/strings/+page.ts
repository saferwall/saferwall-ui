import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import type { APIPagination } from '$lib/types/pagination';
import type { APIStrings } from '$lib/types/strings';
import type { PageLoad } from './$types';

// TODO: implement search
export const load = (async ({ params, url }): Promise<{
    pagination: APIPagination<APIStrings>,
}> => {
    const { hash } = params;

    const page = parseInt(url.searchParams.get('page')!) || 1;
    const per_page = parseInt(url.searchParams.get('per_page')!) || 10;

    const initReq: { cache?: RequestCache, body?: any } = {};
    if (browser) {
        initReq.cache = "force-cache";
    }

    const urlParams = new URLSearchParams();
    if (page > 0) {
        urlParams.append('page', page.toString());
    }
    if (per_page > 0) {
        urlParams.append('per_page', per_page.toString());
    }

    const fileReq = await fetch(`${env.PUBLIC_API_URL}/files/${hash}/strings?${urlParams.toString()}`, initReq);

    const pagination = await fileReq.json();
    pagination.items = pagination.items ?? [];

    return {
        pagination
    };

}) satisfies PageLoad;