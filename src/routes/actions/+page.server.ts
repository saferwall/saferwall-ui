import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	await parent();
	return {};
}) satisfies PageServerLoad;

export const actions = {
	follow: async ({ request, locals: { client } }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		const follow = (data.get('follow') as string) === 'follow' ? true : false;

		try {
			await client.followUser(username, follow);
			return {
				username,
				follow
			};
		} catch (response) {
			return fail(400, await (response as Response).json());
		}
	},
	like: async ({ request, locals: { client } }) => {
		const data = await request.formData();

		const hash = data.get('hash') as string;
		const like = (data.get('like') as string) === 'like' ? true : false;

		try {
			await client.likeFile(hash, like);
			return {
				hash,
				like
			};
		} catch (response) {
			return fail(400, await (response as Response).json());
		}
	}
} satisfies Actions;
