import { SaferwallClient } from '$lib/clients/saferwall';
import { fileMenu } from '$lib/data/menu';
import type { Menu, Saferwall } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent, params, url }) => {
	const parentData = await parent();

	const { hash } = params;
	const paths = url.pathname.split(`/files/`)[1].split('/');

	const activePath = paths[1];
	const activeMenu = fileMenu.find((menu) => menu.path === activePath)! || {};

	let file = {} as unknown as Saferwall.File,
		activeFileMenu: Menu.File[];

	try {
		file = await new SaferwallClient(parentData.session).getFileSummary(hash);

		activeFileMenu = [...fileMenu].filter(
			(menu) =>
				`${menu.name}`.toLowerCase() !== 'pe' || `${file.file_format}`.toLowerCase() === 'pe'
		);
	} catch (error) {
		activeFileMenu = [...fileMenu].filter((menu) => `${menu.name}`.toLowerCase() !== 'pe');
	}

	return {
		hash,
		file,
		paths,
		activeMenu,
		activeFileMenu
	};
}) satisfies LayoutLoad;
