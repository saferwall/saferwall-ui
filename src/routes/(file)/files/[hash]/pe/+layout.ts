import type { APIFile } from '$lib/types/files';
import type { LayoutLoad } from './$types';

export const load = (async ({
	parent
}): Promise<{
	activePEMenu: string;
	file: APIFile;
}> => {
	const { paths, ...parentData } = await parent();
	return {
		...parentData,
		activePEMenu: paths[2]
	};
}) satisfies LayoutLoad;
