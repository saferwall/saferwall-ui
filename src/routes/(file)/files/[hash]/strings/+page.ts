import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

// TODO: implement search
export const load = (async ({ params, url, parent }) => {
	const { client } = await parent();

	const page = Math.abs(parseInt(url.searchParams.get('page')!) || 1);
	const perPage = Math.abs(parseInt(url.searchParams.get('per_page')!) || 10);

	const urlParams = new URLSearchParams({
		page: page.toString(),
		per_page: perPage.toString()
	});

	const pagination = await client.request<Saferwall.Pagination<{ encoding: string, value: string }>>(
		`files/${params.hash}/strings?${urlParams.toString()}`
	);
	pagination.items ??= [];

	return {
		pagination
	};
}) satisfies PageLoad;
