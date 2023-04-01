import { APIClient } from "$lib/api";
import type { ProfileSection } from "$lib/types";
import type { APIPagination } from "$lib/types/pagination";
import type { APIUser, APIItem } from "$lib/types/users";
import type { LayoutLoad } from "./$types";

export const load = (async ({ params, parent, url }): Promise<{
    username: string,
    user: APIUser,
    currentPath: string,
    pagination: APIPagination<APIItem>,
    section: ProfileSection
}> => {
    const data = await parent();
    const currentPath = await url.pathname;

    const { username } = params;
    const section = (currentPath.split('/').slice(-1)).join('') as ProfileSection;

    const pagination = await APIClient.request(`users/${username}/${section}`);

    return {
        section,
        currentPath,
        pagination,
        ...data
    };

}) satisfies LayoutLoad;