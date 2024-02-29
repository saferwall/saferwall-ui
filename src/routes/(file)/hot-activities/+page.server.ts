import type { PageServerLoad } from './$types';

export const load = (async ({ platform }) => {
	const latestKeys = await platform?.env?.HOT_ACTIVITIES.list();
	const activitesList = await Promise.all(
		[...latestKeys.keys].map(({ name }: { name: string }) => {
			return platform?.env?.HOT_ACTIVITIES.get(name);
		})
	);

	const activities = activitesList
		.map((activityJson) => {
			try {
				const activity = JSON.parse(activityJson);

				return {
					title: activity.title,
					refs: activity.refs || [],
					files: activity.files || [],
					date: activity.createdAt
				};
			} catch (error) {
				console.error('parse activity failed', activityJson);
			}
		})
		.filter((a) => a);

	return {
		activities
	};
}) satisfies PageServerLoad;
