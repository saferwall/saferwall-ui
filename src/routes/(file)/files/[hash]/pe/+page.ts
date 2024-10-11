import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	redirect(302, `${url}/dos-header`);
}) satisfies PageLoad;
