import { fileMenu } from '$lib/data/menu';
import type { Menu, Saferwall } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent, params: { hash }, url, fetch, route }) => {
	const { client } = await parent();

	const paths = url.pathname.split(`/files/`)[1].split('/');

	const activePath = paths[1];
	const activeMenu = fileMenu.find((menu) => menu.path === activePath)! || {};

	let file = {} as unknown as Saferwall.File,
		activeFileMenu: Menu.File[];

	try {
		if (route.id.endsWith("/pe")) {
			throw new Error();
		}
		file = await client.with(fetch).getFileSummary(hash);
		activeFileMenu = [...fileMenu]
			.filter(
				(menu) =>
					`${menu.name}`.toLowerCase() !== 'pe' || `${file.file_format}`.toLowerCase() === 'pe'
			)
			.filter(
				(menu) =>
					!(
						['files-memdumps', 'dynamic-overview', 'api-calls'].includes(menu.path) &&
						!file.default_behavior_report
					)
			);
	} catch (error) {
		activeFileMenu = [...fileMenu].filter((menu) => `${menu.name}`.toLowerCase() !== 'pe');
	}

	return {
		client,
		hash,
		file,
		paths,
		activeMenu,
		activeFileMenu
	};
}) satisfies LayoutLoad;
