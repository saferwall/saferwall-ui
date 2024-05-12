import { SaferwallClient } from '$lib/clients/saferwall';
import { artifcatsKinds, convertBytes, getArtifcatKind } from '$lib/utils';
import type { PageLoad } from './$types';

const categoriesList = Object.entries(artifcatsKinds).map(([name, label]) => {
	return {
		name,
		label
	};
});

export const load = (async ({ url, parent }) => {
	const {
		session,
		file: { default_behavior_id: behaviorId }
	} = await parent();

	const search = url.searchParams.get('search');
	const categories = url.searchParams
		.get('categories')
		?.toLowerCase()
		?.split(',')
		?.filter((c) => categoriesList.find((_) => _.name === c));

	const pagination = await new SaferwallClient(session).getBehaviorArtifcats(behaviorId!);

	return {
		behaviorId,
		categories: categoriesList,
		filters: {
			categories
		},
		pagination,
		search: typeof search === 'string' ? search : undefined
	};
}) satisfies PageLoad;
