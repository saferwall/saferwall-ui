import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, locals: { client } }) => {
	const username = params.username!;
	const user = await client.getUser(username);

	return {
		profile: user,
		username: username
	};
}) satisfies LayoutServerLoad;
