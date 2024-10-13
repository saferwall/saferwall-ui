import { fileMenu } from '$lib/data/menu';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent, params: { hash }, url }) => {
	const { client } = await parent();

	const paths = url.pathname.split(`/files/`)[1].split('/');

	const activePath = paths[1];
	const activeMenu = fileMenu.find((menu) => menu.path === activePath)! || {};

	return {
		client,
		hash,
		paths,
		activeMenu,
	};
}) satisfies LayoutLoad;
