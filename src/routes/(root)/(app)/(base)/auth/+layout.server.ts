import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ locals, url }) => {
	// if logout
	if (url.pathname === '/auth/logout') {
		return {};
	}

	// if authentified redirect home page
	if (locals.user) {
		throw redirect(302, '/');
	}
}) satisfies LayoutServerLoad;
