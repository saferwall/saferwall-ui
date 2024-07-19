import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, url }) => {
	throw redirect(301, `/users/${params.username}/likes`);
}) satisfies PageLoad;
