import { APIClient } from '$lib/api';
import type APISummary from '$lib/types/summary';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    summary: APISummary
}> => {
    const parentData = await parent();

    const { hash } = params;

    const summary = await new APIClient(parentData.session).getFileSummary(hash);

    return {
        summary,
    };

}) satisfies PageLoad;