import { redirect } from '@sveltejs/kit';
import { tryCatch } from '$lib/utils/try_catch';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ parent, params, url }) => {
	const {
		client,
	} = await parent();

	const behaviorReportId = url.searchParams.get("behavior_id");
	if (!behaviorReportId) {
		throw redirect(307, `/files/${params.hash}/`);
	}

	const [processArray] = await tryCatch(client.getFileProcessTree(behaviorReportId));
	if (!processArray) {
		url.searchParams.delete("behavior_id");
		throw redirect(307, url);
	}
	return {
		behaviorId: behaviorReportId,
		processArray
	};
};
