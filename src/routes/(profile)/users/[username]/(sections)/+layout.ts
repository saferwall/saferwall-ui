import { SaferwallClient } from '$lib/clients/saferwall';
import type { LayoutLoad } from './$types';
import type { ProfileSection, User } from '$lib/types';
import type { APIPagination } from '$lib/types';
import type { APIUser, APIItem } from '$lib/types/users';

export const load = (async ({
	params: { username },
	parent,
	url: { pathname }
}): Promise<{
	username: string;
	profile: APIUser;
	currentPath: string;
	pagination: APIPagination<APIItem>;
	section: ProfileSection;
	user: User;
}> => {
	const data = (await parent()) as any;

	const section = pathname.split('/').slice(-1).join('') as ProfileSection;

	const pagination = await new SaferwallClient(data.session).getUserSectionItems<APIItem>(
		username,
		section
	);

	return {
		...data,
		section,
		pagination,
		currentPath: pathname
	};
}) satisfies LayoutLoad;
