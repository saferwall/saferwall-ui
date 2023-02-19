import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    items: any[]
}> => {
    const { hash } = params;

    const initReq: { cache?: RequestCache, body?: any } = {};
    if (browser) {
        initReq.cache = "force-cache";
    }
    const fileReq = await fetch(`${env.PUBLIC_API_URL}/files/${hash}?fields=pe.bound_import`, initReq);

    const { pe } = await fileReq.json();

    return {
        items: pe.bound_import
    };

}) satisfies PageLoad;