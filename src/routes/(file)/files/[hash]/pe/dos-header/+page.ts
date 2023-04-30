import { APIClient } from '$lib/api';
import type { APIFile } from '$lib/types/files';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    dosHeader: any
}> => {
    const { hash } = params;

    const { pe } = await new APIClient().request<APIFile>(`files/${hash}?fields=pe.dos_header`);


    return {
        dosHeader: pe.dos_header
    };

}) satisfies PageLoad;