import { SaferwallClient } from '$lib/clients/saferwall';
import type { Saferwall } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ params: { username }, parent, url: { pathname } }) => {
	const data = (await parent()) as any;

	const section = pathname.split('/').slice(-1).join('') as Saferwall.ProfileSection;

	const pagination = await new SaferwallClient(data.session).getUserSectionItems(username, section);

	return {
		...data,
		username,
		section,
		pagination,
		currentPath: pathname
	};
}) satisfies LayoutLoad;
