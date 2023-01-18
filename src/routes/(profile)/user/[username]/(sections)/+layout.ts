import { browser } from "$app/environment";
import { env } from "$env/dynamic/public";
import type { APIPagination } from "$lib/types/pagination";
import type { APIUser, APIItem } from "$lib/types/users";
import type { LayoutLoad } from "./$types";

export const load = (async ({ params, parent, url }): Promise<{
    username: string,
    user: APIUser,
    currentPath: string,
    pagination: APIPagination<APIItem>,
    section: 'likes' | 'comments' | 'submissions' | 'followers' | 'following'
}> => {
    const data = await parent();
    const currentPath = await url.pathname;

    const { username } = params;
    const section = currentPath.split('/').slice(-1);

    const initReq: { cache?: RequestCache | undefined } = {};
    if (browser) {
        initReq.cache = "force-cache";
    }

    const fileReq = await fetch(`${env.PUBLIC_API_URL}/users/${username}/${section}`, initReq);

    const pagination = await fileReq.json();

    return {
        section,
        currentPath,
        pagination,
        ...data
    };

}) satisfies LayoutLoad;