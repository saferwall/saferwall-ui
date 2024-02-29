import { fail } from '@sveltejs/kit';
import { SESSION_KEY } from '$lib/config';
import type { PageServerLoad, Actions } from './$types';
import { SaferwallClient } from '$lib/clients/saferwall';

export const load = (async ({ parent, cookies, locals }) => {
	await parent();

	try {
		const session = await cookies.get(SESSION_KEY);
		locals.session = JSON.parse(session!);
	} catch (error) {
		// Invalid session
	}

	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		const password = data.get('password') as string;

		const requiredFields: Record<string, boolean> = {};

		if (!username) {
			requiredFields.username = true;
		}
		if (!password) {
			requiredFields.password = true;
		}

		if (Object.keys(requiredFields).length > 0) {
			return fail(400, { ...requiredFields, missing: true });
		}

		try {
			const session = await new SaferwallClient().singIn({
				username,
				password
			});

			cookies.set(SESSION_KEY, JSON.stringify(session), {
				httpOnly: true,
				secure: true,
				path: '/'
			});

			return {
				success: true
			};
		} catch (response) {
			cookies.delete(SESSION_KEY, {
				httpOnly: true,
				secure: true,
				path: '/'
			});
			return fail(400, await (response as Response).json());
		}
	}
} satisfies Actions;
