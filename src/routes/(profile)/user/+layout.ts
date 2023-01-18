import { browser } from "$app/environment";
import { env } from "$env/dynamic/public";
import type { APIUser } from "$lib/types/users";
import type { LayoutLoad } from "./$types";

export const load = (async ({ params }): Promise<{
    username: string,
    user: APIUser
}> => {
    const { username } = params;

    const initReq: { cache?: RequestCache | undefined } = {};
    if (browser) {
        initReq.cache = "force-cache";
    }

    const fileReq = await fetch(`${env.PUBLIC_API_URL}/users/${username}`, initReq);

    const user = await fileReq.json();

    return {
        username: username!,
        user: user
    };

}) satisfies LayoutLoad;