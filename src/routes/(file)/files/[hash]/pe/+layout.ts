import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const { paths, ...parentData } = await parent();
	return {
		...parentData,
		activePEMenu: paths[2]
	};
}) satisfies LayoutLoad;
