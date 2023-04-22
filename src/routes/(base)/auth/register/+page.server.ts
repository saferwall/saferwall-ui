import { fail } from '@sveltejs/kit';
import { SESSION_KEY } from '$lib/config';
import type { PageServerLoad, Actions } from './$types';
import { APIClient } from '$lib/api';

export const load = (async ({ parent, cookies, locals }: any) => {
    await parent();

    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const email = data.get('email') as string;
        const username = data.get('username') as string;
        const password = data.get('password') as string;

        const requiredFields: Record<string, boolean> = {};
        if (!email)
            requiredFields.email = true;
        if (!username)
            requiredFields.username = true;
        if (!password)
            requiredFields.password = true;

        if (Object.keys(requiredFields).length > 0) {
            return fail(400, { ...requiredFields, missing: true });
        }


        try {
            await APIClient.signUp({
                email,
                username,
                password
            });

            return { success: true };
        } catch (error: any) {
            return fail(400, { error: await error.json() });
        }
    }
} satisfies Actions;
