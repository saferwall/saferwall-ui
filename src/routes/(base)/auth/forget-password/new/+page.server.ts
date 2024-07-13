import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	await parent();

	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, url, locals: { client } }) => {
		const data = await request.formData();

		const guid = url.searchParams.get('guid') as string;
		const token = url.searchParams.get('token') as string;
		const password = data.get('password') as string;

		const requiredFields: Record<string, boolean> = {};

		if (!password) {
			requiredFields.password = true;
		}

		if (!token || !guid) {
			return fail(400, {
				error: { message: 'Invalid or expired token' }
			});
		}

		if (password.length < 5) {
			return fail(400, {
				error: { message: 'Password length must be more than 5 characters' }
			});
		}

		if (Object.keys(requiredFields).length > 0) {
			return fail(400, { ...requiredFields, missing: true });
		}

		try {
			await client.changePassword({
				password,
				token,
				guid
			});
			return {
				success: true
			};
		} catch (response) {
			return fail(400, await (response as Response).json());
		}
	}
} satisfies Actions;
