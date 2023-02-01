import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    iat: any
}> => {
    const { hash } = params;

    const initReq: { cache?: RequestCache, body?: any } = {};
    if (browser) {
        initReq.cache = "force-cache";
    }
    const fileReq = await fetch(`${env.PUBLIC_API_URL}/files/${hash}?fields=pe.iat`, initReq);

    const { pe } = await fileReq.json();

    return {
        iat: pe.iat
    };

}) satisfies PageLoad;