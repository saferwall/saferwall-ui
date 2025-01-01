import type { Saferwall } from "$lib/types";
import type { PageLoad } from "./$types";

export const load = (async ({parent}) => {
	const { client, gotoApp } = await parent();

	let pagination: Partial<Saferwall.Pagination<Saferwall.Activity>> = gotoApp ? await client.getActivities() : {};
	return {
		pagination
	};
}) satisfies PageLoad;
