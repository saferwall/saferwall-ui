import { APIClient } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    imports: any[]
}> => {
    const { hash } = params;

    const { pe } = await APIClient.request<APIFile>(`files/${hash}?fields=pe.import`);

    return {
        imports: pe.import
    };

}) satisfies PageLoad;