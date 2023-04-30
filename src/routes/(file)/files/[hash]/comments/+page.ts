import type { APIPagination } from '$lib/types/pagination';
import type { APIComment } from '$lib/types/comments';
import type { PageLoad } from './$types';
import { APIClient } from '$lib/api';

export const load = (async ({ params }): Promise<{
    pagination: APIPagination<APIComment>,
}> => {
    const { hash } = params;

    const pagination = await new APIClient().request<APIFile>(`files/${hash}/comments`);
    pagination.items = pagination.items ?? [];

    return {
        pagination
    };

}) satisfies PageLoad;