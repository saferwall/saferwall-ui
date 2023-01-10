import { browser } from '$app/environment';
import type APISummary from '$lib/types/summary';
import type { PageLoad } from './$types';

export const load = (async ({ params, url }): Promise<{
    summary: APISummary
}> => {
    const { hash } = params;

    const headers: { cache?: RequestCache | undefined } = {};
    if (browser) {
        headers.cache = "force-cache";
    }

    const fileReq = await fetch(`https://api.saferwall.com/v1/files/${hash}/summary`, { ...headers });

    const summary = await fileReq.json();

    return {
        summary,
    };

}) satisfies PageLoad;