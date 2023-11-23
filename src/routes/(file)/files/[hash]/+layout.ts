import { SaferwallClient } from '$lib/clients/saferwall';
import { fileMenu } from '$lib/data/menus';
import type { Menus } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent, params, url }) => {
	const parentData = await parent();

	const { hash } = params;
	const paths = url.pathname.toString().split(`/files/`)[1].split('/');
	const activePath = paths[1];
	const activeMenu = fileMenu.find((menu) => menu.path === activePath)! || {};

	let file: any, menus: Menus.File[];
	try {
		file = await new SaferwallClient(parentData.session).getFileSummary(hash);

		menus = [...fileMenu].filter((menu) => {
			if (`${menu.name}`.toLowerCase() === 'pe' && `${file.file_format}`.toLowerCase() !== 'pe') {
				return false;
			}

			return true;
		});
	} catch (error) {
		file = {};
		menus = [...fileMenu].filter((menu) => {
			if (`${menu.name}`.toLowerCase() === 'pe') {
				return false;
			}

			return true;
		});
	}

	return {
		hash,
		file,
		paths,
		activeMenu,
		fileMenu: menus
	};
}) satisfies LayoutLoad;
