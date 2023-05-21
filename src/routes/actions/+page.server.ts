import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { APIClient } from '$lib/api';

export const load = (async ({ parent }: any) => {
    await parent();
    return {};
}) satisfies PageServerLoad;

export const actions = {
    follow: async ({ request, locals }) => {
        const data = await request.formData();

        const username = data.get('username') as string;
        const follow = data.get('follow') as string === 'follow' ? true : false;

        try {
            await new APIClient(locals.session).followUser(username, follow);
            return {
                username,
                follow
            };
        } catch (response: any) {
            return fail(400, await response.json());
        }
    },
    like: async ({ request, locals }) => {
        const data = await request.formData();

        const hash = data.get('hash') as string;
        const like = data.get('like') as string === 'like' ? true : false;

        try {
            await new APIClient(locals.session).likeFile(hash, like);
            return {
                hash,
                like
            };
        } catch (response: any) {
            return fail(400, await response.json());
        }
    }
} satisfies Actions;
