import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { client } }) => {
	const pagination = await client.getActivities();
	return {
		pagination
	};
}) satisfies PageServerLoad;
