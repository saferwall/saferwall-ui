import { SaferwallClient } from '$lib/clients/saferwall';
import type { UpdateProfileDto } from '$lib/types';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	information: async ({ locals: { session }, request }) => {
		const formData = await request.formData();
		const data: UpdateProfileDto = Object.fromEntries(formData.entries()) as any;

		await new SaferwallClient(session).updateProfile(data);
		return true;
	},
	email: async ({ locals: { user, session }, request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !user.username || !password) {
			return fail(400, {
				message: 'Required fields are missing'
			});
		}

		try {
			await new SaferwallClient(session).updateEmail({
				email,
				password,
				username: user.username
			});
			return {
				success: true
			};
		} catch (response) {
			return fail(400, await (response as Response).json());
		}
	},
	password: async ({ locals: { user, session }, request }) => {
		const formData = await request.formData();
		const oldPassword = formData.get('password') as string;
		const newPassword = formData.get('new_password') as string;

		if (!oldPassword || !newPassword) {
			return fail(400, {
				message: 'Required fields are missing'
			});
		}

		try {
			await new SaferwallClient(session).updatePassword({
				username: user.username,
				old: oldPassword,
				new_password: newPassword
			});
			return {
				success: true
			};
		} catch (response) {
			return fail(400, await (response as Response).json());
		}
	},
	delete: async ({ locals: { session, user } }) => {
		try {
			await new SaferwallClient(session).deleteAccount(user.username);
			return {
				status: true
			};
		} catch (response) {
			return fail(400, await (response as Response).json());
		}
	}
} satisfies Actions;
