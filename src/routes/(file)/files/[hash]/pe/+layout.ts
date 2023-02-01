import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
    const { paths } = await parent();
    return {
        activePEMenu: paths[2]
    };
}) satisfies LayoutLoad;