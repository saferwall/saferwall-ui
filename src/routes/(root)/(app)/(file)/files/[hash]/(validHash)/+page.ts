import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	throw redirect(301, `${url.pathname}/summary${url.search}`);
}) satisfies PageLoad;
