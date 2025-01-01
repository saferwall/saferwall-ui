import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	throw redirect(301, `${url.pathname}/dos-header${url.search}`);
}) satisfies PageLoad;
