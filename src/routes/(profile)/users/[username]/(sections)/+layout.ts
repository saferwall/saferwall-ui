import { APIClient } from "$lib/api";
import type { LayoutLoad } from "./$types";
import type { ProfileSection, User } from "$lib/types";
import type { APIPagination } from "$lib/types/pagination";
import type { APIUser, APIItem } from "$lib/types/users";

export const load = (async ({ params, parent, url }): Promise<{
    username: string,
    profile: APIUser,
    currentPath: string,
    pagination: APIPagination<APIItem>,
    section: ProfileSection,
    user: User
}> => {
    const { username } = params;
    const data = await parent() as any;

    const currentPath = await url.pathname;
    const section = (currentPath.split('/').slice(-1))
        .join('') as ProfileSection;

    const pagination = await new APIClient(data.session)
        .request(`users/${username}/${section}`);

    return {
        ...data,
        section,
        currentPath,
        pagination,
    };

}) satisfies LayoutLoad;