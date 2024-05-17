import { SaferwallClient } from '$lib/clients/saferwall';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ parent, params }) => {
	const {
		session,
		file: { default_behavior_report: behaviorReport }
	} = await parent();

	if (!behaviorReport || !behaviorReport.id) {
		throw redirect(307, `/files/${params.hash}/summary`);
	}

	const processArray = await new SaferwallClient(session).getFileProcessTree(behaviorReport.id);
	return {
		behaviorId: behaviorReport.id,
		processArray
	};
};
