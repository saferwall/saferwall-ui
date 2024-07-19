import { SaferwallClient } from '$lib/clients/saferwall';
import { artifactsKinds } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const categoriesList = Object.entries(artifactsKinds).map(([name, label]) => {
	return {
		name,
		label
	};
});

export const load = (async ({ url, parent, params }) => {
	const {
		session,
		file: { default_behavior_report: behaviorReport }
	} = await parent();

	if (!behaviorReport || !behaviorReport.id) {
		throw redirect(307, `/files/${params.hash}/summary`);
	}

	const search = url.searchParams.get('search');
	const page = Math.abs(parseInt(url.searchParams.get('page')!) || 1);
	const perPage = Math.abs(parseInt(url.searchParams.get('per_page')!) || 200);
	const categories =
		url.searchParams
			.get('categories')
			?.toLowerCase()
			?.split(',')
			?.filter((c) => categoriesList.find((_) => _.name === c)) || [];

	const pagination = await new SaferwallClient(session).getBehaviorArtifacts(
		behaviorReport.id,
		categories,
		{
			per_page: perPage,
			page: page
		}
	);

	return {
		behaviorId: behaviorReport.id,
		categories: categoriesList,
		filters: {
			categories
		},
		pagination,
		search: typeof search === 'string' ? search : undefined
	};
}) satisfies PageLoad;
