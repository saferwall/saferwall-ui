import { SaferwallClient } from '$lib/clients/saferwall';
import { artifcatsKinds, convertBytes, getArtifcatKind } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const categoriesList = Object.entries(artifcatsKinds).map(([name, label]) => {
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
	const categories = url.searchParams
		.get('categories')
		?.toLowerCase()
		?.split(',')
		?.filter((c) => categoriesList.find((_) => _.name === c));

	const pagination = await new SaferwallClient(session).getBehaviorArtifcats(behaviorReport.id);

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
