import { SaferwallClient } from '$lib/clients/saferwall';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ parent }) => {
	const {
		session,
		file: { default_behavior_id: behaviorId }
	} = await parent();

	if (!behaviorId) {
		throw redirect(307, './');
	}

	const processArray = await new SaferwallClient(session).getFileProcessTree(behaviorId);
	return {
		behaviorId,
		processArray
	};
};
