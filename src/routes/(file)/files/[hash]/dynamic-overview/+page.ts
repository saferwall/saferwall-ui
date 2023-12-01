import { SaferwallClient } from '$lib/clients/saferwall';
import type { PageLoad } from '../$types';
import type { Saferwall } from '$lib/types';

export const load: PageLoad = async ({ parent }) => {
	const {
		session,
		file: { default_behavior_id }
	} = await parent();

	const processArray = await new SaferwallClient(session).getFileProcessTree(default_behavior_id);

	return {
		processArray,
		behaviorId: default_behavior_id
	};
};
