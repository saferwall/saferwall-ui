import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { user } = await parent();

	if (user) {
		throw redirect(301, `/app/users/${user.username}/likes`);
	}

	throw redirect(301, '/app/auth/login');
}) satisfies PageServerLoad;
