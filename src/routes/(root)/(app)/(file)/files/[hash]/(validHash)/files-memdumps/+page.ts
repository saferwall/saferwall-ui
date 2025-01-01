import { categoriesList } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { tryCatch } from '$lib/utils/try_catch';

export const load = (async ({ url, parent, params }) => {
	const {
		client,
	} = await parent();

	const behaviorReportId = url.searchParams.get("behavior_id");
	if (!behaviorReportId) {
		throw redirect(307, `/files/${params.hash}/`);
	}

	const search = url.searchParams.get('search');
	const page = Math.abs(parseInt(url.searchParams.get('page')!) || 1);
	const perPage = Math.abs(parseInt(url.searchParams.get('per_page')!) || 20);
	const categories =
		url.searchParams
			.get('categories')
			?.toLowerCase()
			?.split(',')
			?.filter((c) => categoriesList.find((_) => _.name === c)) || [];

	const [pagination] = await tryCatch(client.getBehaviorArtifacts(behaviorReportId, categories, {
		per_page: perPage,
		page: page
	}));

	if (!pagination) {
		throw redirect(307, `/files/${params.hash}/`);
	}

	return {
		behaviorId: behaviorReportId,
		filters: {
			categories
		},
		pagination,
		search: typeof search === 'string' ? search : undefined
	};
}) satisfies PageLoad;
