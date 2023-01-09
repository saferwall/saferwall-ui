import type APISummary from '$lib/types/summary';
import type { PageLoad } from './$types';

export const load = (async ({ params, url }): Promise<{
    summary: APISummary
}> => {
    const { hash } = params;

    const fileReq = await fetch(`https://api.saferwall.com/v1/files/${hash}/summary`, {
        cache: "force-cache"
    });
    const summary = await fileReq.json();

    return {
        summary,
    };

}) satisfies PageLoad;