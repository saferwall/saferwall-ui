import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params: { username } }) => {
	throw redirect(301, `/users/${username}/likes`);
}) satisfies PageLoad;
