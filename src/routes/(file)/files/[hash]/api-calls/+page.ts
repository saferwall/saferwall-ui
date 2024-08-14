import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ url, parent, params }) => {
	const {
		client,
		file: { default_behavior_report: behaviorReport }
	} = await parent();

	if (!behaviorReport || !behaviorReport.id) {
		throw redirect(307, `/files/${params.hash}/summary`);
	}
	const behaviorId = behaviorReport.id;

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

	const pagination = await client.getFileApiTrace(behaviorId!, args);

	pagination.items = pagination.items ?? [];

	return {
		search: typeof search === 'string' ? search : undefined,
		pagination,
		hiddenProps,
		behaviorId,
		filters: {
			pids
		}
	};
}) satisfies PageLoad;
