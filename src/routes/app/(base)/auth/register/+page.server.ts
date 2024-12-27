import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	await parent();
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals: { client } }) => {
		const data = await request.formData();

		const email = data.get('email') as string;
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		const requiredFields: Record<string, boolean> = {};
		if (!email) requiredFields.email = true;
		if (!username) requiredFields.username = true;
		if (!password) requiredFields.password = true;

		if (Object.keys(requiredFields).length > 0) {
			return fail(400, { ...requiredFields, missing: true });
		}

		try {
			await client.signUp({
				email,
				username,
				password
			});

			return { success: true };
		} catch (response) {
			return fail(400, await (response as Response).json());
		}
	}
} satisfies Actions;
