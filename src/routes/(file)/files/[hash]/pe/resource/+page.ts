import { APIClient } from '$lib/api';
import type { APIFile } from '$lib/types/files';
import type { PageLoad } from './$types';

export const load = (async ({ params }): Promise<{
    resource: any[]
}> => {
    const { hash } = params;

    const { pe } = await new APIClient().request<APIFile>(`files/${hash}?fields=pe.resource`);

    return {
        resource: pe.resource
    };

}) satisfies PageLoad;