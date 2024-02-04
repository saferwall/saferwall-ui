import type { Saferwall } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const { paths, file, ...parentData } = await parent();

	return {
		...parentData,
		file: file as unknown as Saferwall.Summary & Saferwall.File,
		menu: paths[2]
	};
}) satisfies LayoutLoad;
