import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { tryCatch } from '$lib/utils/try_catch';

export const load = (async ({ url, parent, params }) => {
	const {
		client,
	} = await parent();

	const behaviorReportId = url.searchParams.get("behavior_id");
	if (!behaviorReportId) {
		throw redirect(307, `/files/${params.hash}/`);
	}

	const search = url.searchParams.get('search');
	const page = Math.abs(parseInt(url.searchParams.get('page')!) || 1);
	const perPage = Math.abs(parseInt(url.searchParams.get('per_page')!) || 10);

	const pids = url.searchParams.get('pids')?.split(',');
	const hiddenProps = url.searchParams.get('hprops')?.split(',');

	const args: Record<string, any> = {
		page: page > 0 ? page : undefined,
		per_page: perPage > 0 ? perPage : undefined
	};

	if (pids && pids.filter(Boolean).length > 0) {
		args.pid = pids;
	}

	const [pagination] = await tryCatch(client.getFileApiTrace(behaviorReportId!, args));

	if (!pagination) {
		throw redirect(307, `/files/${params.hash}/`);
	}
	pagination.items = pagination.items ?? [];

	return {
		search: typeof search === 'string' ? search : undefined,
		pagination,
		hiddenProps,
		behaviorId: behaviorReportId,
		filters: {
			pids
		}
	};
}) satisfies PageLoad;
