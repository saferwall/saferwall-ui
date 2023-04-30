import { APIClient } from "$lib/api";
import type { APIUser } from "$lib/types/users";
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, locals }): Promise<{
    username: string,
    profile: APIUser
}> => {
    const username = params.username!;
    const user = await new APIClient(locals.session).getUser(username);

    return {
        profile: user,
        username: username,
    };
}) satisfies LayoutServerLoad;