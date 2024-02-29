import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

// TODO: implement search
export const load = (async ({ params, url }) => {
	const page = parseInt(url.searchParams.get('page')!) || 1;
	const perPage = parseInt(url.searchParams.get('per_page')!) || 10;

	const urlParams = new URLSearchParams();
	if (page > 0) {
		urlParams.append('page', page.toString());
	}
	if (perPage > 0) {
		urlParams.append('per_page', perPage.toString());
	}

	const pagination = await new SaferwallClient().request<Saferwall.Pagination<Saferwall.Strings>>(
		`files/${params.hash}/strings?${urlParams.toString()}`
	);
	pagination.items = pagination.items ?? [];

	return {
		pagination
	};
}) satisfies PageLoad;
