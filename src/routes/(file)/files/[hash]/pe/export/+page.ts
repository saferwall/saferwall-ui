import { APIClient } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    exportData: {}
}> => {
    const { hash } = params;

    const { pe } = await new APIClient().request<APIFile>(`files/${hash}?fields=pe.export`);

    return {
        exportData: pe.export
    };

}) satisfies PageLoad;