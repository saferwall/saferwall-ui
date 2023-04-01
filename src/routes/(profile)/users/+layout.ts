import { browser } from "$app/environment";
import { env } from "$env/dynamic/public";
import { APIClient } from "$lib/api";
import type { APIUser } from "$lib/types/users";
import type { LayoutLoad } from "./$types";

export const load = (async ({ params }): Promise<{
    username: string,
    user: APIUser
}> => {
    const username = params.username!;
    const user = await APIClient.getUser(username);

    return {
        username: username,
        user: user
    };

}) satisfies LayoutLoad;