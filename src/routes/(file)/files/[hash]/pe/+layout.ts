import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const { paths, ...parentData } = await parent();

	return {
		...parentData,
		PEMenu: paths[2]
	};
}) satisfies LayoutLoad;
