import type { LayoutLoad } from "./$types";

export const load = (async ({ params }): Promise<{
    username: string
}> => {
    const { username } = params;

    return {
        username: username!
    };

}) satisfies LayoutLoad;