import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const { hash } = params;

	const pagination = await new SaferwallClient().request<Saferwall.Pagination<Saferwall.Comment>>(
		`files/${hash}/comments`
	);
	pagination.items = pagination.items ?? [];

	return {
		pagination
	};
}) satisfies PageLoad;
