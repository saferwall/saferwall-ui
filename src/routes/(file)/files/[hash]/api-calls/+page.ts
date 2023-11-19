import { SaferwallClient } from '$lib/clients/saferwall';
import type { PageLoad } from './$types';

export const load = (async ({ url, parent }) => {
	const {
		file: { default_behavior_id }
	} = await parent();

	const search = url.searchParams.get('search');
	const page = parseInt(url.searchParams.get('page')!) || 1;
	const per_page = parseInt(url.searchParams.get('per_page')!) || 10;

	const pids = url.searchParams.get('pids')?.split(',');
	const hprops = url.searchParams.get('hprops')?.split(',');

	const args: Record<string, any> = {
		page: page > 0 ? page : undefined,
		per_page: per_page > 0 ? per_page : undefined
	};

	if (pids && pids.filter(Boolean).length > 0) {
		args.pid = pids;
	}

	const pagination = await new SaferwallClient().getFileApiTrace(default_behavior_id!, args);

	pagination.items = pagination.items ?? [];

	return {
		search: typeof search === 'string' ? search : undefined,
		pagination,
		hprops,
		filters: {
			pids
		}
	};
}) satisfies PageLoad;
