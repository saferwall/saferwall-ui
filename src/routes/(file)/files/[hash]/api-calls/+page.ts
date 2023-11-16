import { SaferwallClient } from '$lib/clients/saferwall';
import type { PageLoad } from './$types';

export const load = (async ({ url, parent }) => {
	const {
		file: { default_behavior_id }
	} = await parent();

	const page = parseInt(url.searchParams.get('page')!) || 1;
	const per_page = parseInt(url.searchParams.get('per_page')!) || 10;

	const pids = url.searchParams.get('pids')?.split(',');
	const hprops = url.searchParams.get('hprops')?.split(',');

	const pagination = await new SaferwallClient().getFileReport(default_behavior_id!, {
		page: page > 0 ? page : undefined,
		per_page: per_page > 0 ? per_page : undefined
	});

	pagination.items = pagination.items ?? [];

	return {
		pagination,
		hprops,
		filters: {
			pids
		}
	};
}) satisfies PageLoad;
