import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import type APISummary from '$lib/types/summary';
import type { PageLoad } from './$types';

export const load = (async ({ params }): Promise<{
    summary: APISummary
}> => {
    const { hash } = params;

    const initReq: { cache?: RequestCache | undefined } = {};
    if (browser) {
        initReq.cache = "force-cache";
    }

    const fileReq = await fetch(`${env.PUBLIC_API_URL}/files/${hash}/summary`, initReq);

    const summary = await fileReq.json();

    return {
        summary,
    };

}) satisfies PageLoad;