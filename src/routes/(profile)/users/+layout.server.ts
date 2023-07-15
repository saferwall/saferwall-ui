import { SaferwallClient } from '$lib/clients/saferwall';
import type { Session } from '$lib/types';
import type { APIUser } from '$lib/types/users';
import type { LayoutServerLoad } from './$types';

export const load = (async ({
	params,
	locals
}): Promise<{
	username: string;
	profile: APIUser;
	session: Session;
}> => {
	const username = params.username!;
	const user = await new SaferwallClient(locals.session).getUser(username);

	return {
		profile: user,
		username: username,
		session: locals.session
	};
}) satisfies LayoutServerLoad;
