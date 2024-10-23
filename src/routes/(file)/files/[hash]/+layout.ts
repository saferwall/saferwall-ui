import { fileMenu } from '$lib/data/menu';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent, params: { hash }, url }) => {
	const { client } = await parent();

	if (!url.searchParams.get("behavior_id") && !url.searchParams.get("0_behavior")) {
		const { default_behavior_report: behaviorReport } = await client.request<{ default_behavior_report: { id: string } }>(
			`files/${hash}/?fields=default_behavior_report`
		);
	
		if (!behaviorReport || !behaviorReport.id) {
			url.searchParams.set("0_behavior", "");

			throw redirect(307, url);
		}
		url.searchParams.set("behavior_id", behaviorReport.id);

		throw redirect(307, url)
	}

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
