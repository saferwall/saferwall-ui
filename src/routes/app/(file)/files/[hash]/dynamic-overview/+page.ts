import { redirect } from '@sveltejs/kit';
import type { PageLoad } from '../$types';
import { tryCatch } from '$lib/utils/try_catch';

export const load: PageLoad = async ({ parent, params, url }) => {
	const {
		client,
	} = await parent();

	const behaviorReportId = url.searchParams.get("behavior_id");
	if (!behaviorReportId) {
		throw redirect(307, `/app/files/${params.hash}/`);
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
