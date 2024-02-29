import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const { paths, ...data } = await parent();

	return {
		...data,
		menu: paths[2]
	};
}) satisfies LayoutLoad;
