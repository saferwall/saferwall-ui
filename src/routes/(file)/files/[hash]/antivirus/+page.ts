import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import type { APIAntivirus } from '$lib/types/antivirus';
import type { PageLoad } from './$types';

export const load = (async ({ params }): Promise<{
    antivirus: APIAntivirus
}> => {
    const { hash } = params;

    const initReq: { cache?: RequestCache | undefined } = {};
    if (browser) {
        initReq.cache = "force-cache";
    }

    const fileReq = await fetch(`${env.PUBLIC_API_URL}/files/${hash}?fields=multiav,first_seen,last_scanned`, initReq);

    const antivirus = await fileReq.json();

    return {
        antivirus,
    };

}) satisfies PageLoad;