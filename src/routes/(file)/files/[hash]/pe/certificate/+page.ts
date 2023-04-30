import { APIClient } from '$lib/api';
import type { APIFile } from '$lib/types/files';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    certificate: any
}> => {
    const { hash } = params;

    const { pe } = await new APIClient().request<APIFile>(`files/${hash}?fields=pe.security`);

    return {
        certificate: pe.security
    };

}) satisfies PageLoad;