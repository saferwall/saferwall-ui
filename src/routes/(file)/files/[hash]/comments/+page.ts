import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params: { hash }, parent }) => {
	const { client } = await parent();

	const pagination = await client.request<Saferwall.Pagination<Saferwall.Comment>>(
		`files/${hash}/comments`
	);
	pagination.items = pagination.items ?? [];

	return {
		pagination
	};
}) satisfies PageLoad;
