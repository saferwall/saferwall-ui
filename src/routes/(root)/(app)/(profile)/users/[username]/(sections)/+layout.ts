import type { Saferwall } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ params: { username }, parent, url: { pathname } }) => {
	const { client, ...data } = await parent();

	const section = pathname.split('/').slice(-1).join('') as Saferwall.ProfileSection;

	const pagination = await client.getUserSectionItems(username, section);

	return {
		...data,
		username,
		section,
		pagination,
		currentPath: pathname
	};
}) satisfies LayoutLoad;
