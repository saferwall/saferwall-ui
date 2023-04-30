import { APIClient } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    items: any[]
}> => {
    const { hash } = params;

    const { pe } = await new APIClient().request<APIFile>(`files/${hash}?fields=pe.delay_import`);

    return {
        items: pe.delay_import
    };

}) satisfies PageLoad;