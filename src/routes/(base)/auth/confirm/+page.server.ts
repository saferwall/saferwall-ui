import { fail } from '@sveltejs/kit';
import { APIClient } from '$lib/api';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ parent }: any) => {
    await parent();

    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const email = data.get('email') as string;

        const requiredFields: Record<string, boolean> = {};
        if (!email)
            requiredFields.email = true;

        if (Object.keys(requiredFields).length > 0) {
            return fail(400, { ...requiredFields, missing: true });
        }

        try {
            const { token } = await APIClient.sendConfirmation(email);
            return { success: true };
        } catch (error: any) {
            return fail(400, { error: await error.json() });
        }
    }
} satisfies Actions;
