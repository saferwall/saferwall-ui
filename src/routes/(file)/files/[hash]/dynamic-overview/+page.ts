import { redirect } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ parent, params }) => {
	const {
		client,
	} = await parent();

	const { default_behavior_report: behaviorReport } = await client.request<{ default_behavior_report: { id: string } }>(
		`files/${params.hash}/?fields=default_behavior_report`
	);

	if (!behaviorReport || !behaviorReport.id) {
		throw redirect(307, `/files/${params.hash}/summary`);
	}

	const processArray = await client.getFileProcessTree(behaviorReport.id);
	return {
		behaviorId: behaviorReport.id,
		processArray
	};
};
