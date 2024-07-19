import type { UpdateProfileDto } from '$lib/types';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	information: async ({ locals: { client }, request }) => {
		const formData = await request.formData();
		const data: UpdateProfileDto = Object.fromEntries(formData.entries()) as any;

		await client.updateProfile(data);
		return true;
	},
	email: async ({ locals: { user, client }, request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !user?.username || !password) {
			return fail(400, {
				message: 'Required fields are missing'
			});
		}

		try {
			await client.updateEmail({
				email,
				password,
				username: user!.username
			});
			return {
				success: true
			};
		} catch (response) {
			return fail(400, await (response as Response).json());
		}
	},
	password: async ({ locals: { user, client }, request }) => {
		const formData = await request.formData();
		const oldPassword = formData.get('password') as string;
		const newPassword = formData.get('new_password') as string;

		if (!oldPassword || !newPassword) {
			return fail(400, {
				message: 'Required fields are missing'
			});
		}

		try {
			await client.updatePassword({
				username: user!.username,
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
	delete: async ({ locals: { client, user } }) => {
		try {
			await client.deleteAccount(user!.username);
			return {
				status: true
			};
		} catch (response) {
			return fail(400, await (response as Response).json());
		}
	}
} satisfies Actions;
