import type { APIPagination } from '$lib/types/pagination';
import type { APIComment } from '$lib/types/comments';
import type { PageLoad } from './$types';
import { SaferwallClient } from '$lib/clients/saferwall';

export const load = (async ({
	params
}): Promise<{
	pagination: APIPagination<APIComment>;
}> => {
	const { hash } = params;

	const pagination = await new SaferwallClient().request<APIFile>(`files/${hash}/comments`);
	pagination.items = pagination.items ?? [];

	return {
		pagination
	};
}) satisfies PageLoad;
