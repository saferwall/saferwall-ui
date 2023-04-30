import { APIClient } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    iat: any
}> => {
    const { hash } = params;

    const { pe } = await new APIClient().request<APIFile>(`files/${hash}?fields=pe.iat`);

    return {
        iat: pe.iat
    };

}) satisfies PageLoad;