import type { PageLoad } from "./$types";

export const load = (async ({parent}) => {
	const { client } = await parent();
	const pagination = await client.getActivities();
	return {
		pagination
	};
}) satisfies PageLoad;
