import { SaferwallClient } from '$lib/clients/saferwall';
import type { UpdateProfileData } from '$lib/types';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	information: async ({ locals, request }) => {
		const formData = await request.formData();
		const data: UpdateProfileData = Object.fromEntries(formData.entries()) as any;

		await new SaferwallClient(locals.session).updateProfile(data);
		return true;
	},
	email: async ({ locals, request }) => {
		const { username } = locals.user;

		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !username || !password) {
			return fail(400, {
				message: 'Required fields are missing'
			});
		}

		try {
			await new SaferwallClient(locals.session).updateEmail({
				email,
				password,
				username
			});
			return { success: true };
		} catch (response: any) {
			return fail(400, await response.json());
		}
	},
	password: async ({ locals, request }) => {
		const { username } = locals.user;

		const formData = await request.formData();
		const oldPassword = formData.get('password') as string;
		const newPassword = formData.get('new_password') as string;

		if (!oldPassword || !newPassword) {
			return fail(400, {
				message: 'Required fields are missing'
			});
		}

		try {
			await new SaferwallClient(locals.session).updatePassword({
				username,
				old: oldPassword,
				new_password: newPassword
			});
			return { success: true };
		} catch (response: any) {
			return fail(400, await response.json());
		}
	},
	delete: async ({ locals }) => {
		const { username } = locals.user;

		try {
			await new SaferwallClient(locals.session).deleteAccount(username);
			return { status: true };
		} catch (response: any) {
			return fail(400, await response.json());
		}
	}
} satisfies Actions;
