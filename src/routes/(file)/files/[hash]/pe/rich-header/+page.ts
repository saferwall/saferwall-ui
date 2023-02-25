import { APIClient } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    richHeader: any
}> => {
    const { hash } = params;

    const { pe } = await APIClient.request<APIFile>(`files/${hash}?fields=pe.rich_header`);

    return {
        richHeader: pe.rich_header
    };

}) satisfies PageLoad;