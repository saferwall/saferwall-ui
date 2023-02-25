import { APIClient } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    exceptions: any[]
}> => {
    const { hash } = params;

    const { pe } = await APIClient.request<APIFile>(`files/${hash}?fields=pe.exception`);

    return {
        exceptions: pe.exception
    };

}) satisfies PageLoad;