import { fileMenu } from '$lib/data/menu';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { tryCatch } from '$lib/utils/try_catch';

export const load = (async ({ parent, params: { hash }, url }) => {
	const { client } = await parent();

	if (url.searchParams.get("behavior_id") === null) {
		const [dbi] = await tryCatch(client.request<{ default_behavior_report: { id: string } }>(
			`files/${hash}/?fields=default_behavior_report`
		));
		if (!dbi || !dbi.default_behavior_report.id) {
			url.searchParams.set("behavior_id", "");
			throw redirect(307, url);
		}
		const { default_behavior_report: behaviorReport } = dbi!;
		url.searchParams.set("behavior_id", behaviorReport.id);
		throw redirect(307, url)
	}

	const paths = url.pathname.split(`/app/files/`)[1].split('/');

	const activePath = paths[1];
	const activeMenu = fileMenu.find((menu) => menu.path === activePath)! || {};

	return {
		client,
		hash,
		paths,
		activeMenu,
	};
}) satisfies LayoutLoad;
