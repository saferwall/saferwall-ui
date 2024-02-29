import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const data = (await parent()) as any;

	if (data.user) {
		throw redirect(301, `/users/${data.user.username}/likes`);
	}

	throw redirect(301, '/auth/login');
}) satisfies PageServerLoad;
