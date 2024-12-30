import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	let a = await parent();
	if (a.session?.token) {
		redirect(301, "/app/");
	}
	return a;
}) satisfies LayoutLoad;
