import { APIClient } from '$lib/api';
import type { APIAntivirus } from '$lib/types/antivirus';
import type { PageLoad } from './$types';

export const load = (async ({ params }): Promise<{
    antivirus: APIAntivirus
}> => {
    const { hash } = params;

    const antivirus = await APIClient.request<APIFile>(`files/${hash}?fields=multiav,first_seen,last_scanned`);

    return {
        antivirus,
    };

}) satisfies PageLoad;