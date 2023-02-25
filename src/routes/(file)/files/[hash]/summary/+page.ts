import { APIClient } from '$lib/api';
import type APISummary from '$lib/types/summary';
import type { PageLoad } from './$types';

export const load = (async ({ params }): Promise<{
    summary: APISummary
}> => {
    const { hash } = params;

    const summary = await APIClient.request<APIFile>(`files/${hash}/summary`);

    return {
        summary,
    };

}) satisfies PageLoad;