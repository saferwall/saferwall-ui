import { fail } from '@sveltejs/kit';
import { SaferwallClient } from '$lib/clients/saferwall';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ parent }) => {
	await parent();

	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals: { client } }) => {
		const data = await request.formData();

		const email = data.get('email') as string;

		const requiredFields: Record<string, boolean> = {};

		if (!email) {
			requiredFields.email = true;
		}

		if (Object.keys(requiredFields).length > 0) {
			return fail(400, { ...requiredFields, missing: true });
		}

		try {
			await client.resetPassword(email);
			return {
				success: true
			};
		} catch (response) {
			return fail(400, await (response as Response).json());
		}
	}
} satisfies Actions;
