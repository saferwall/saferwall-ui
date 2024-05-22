import { SaferwallClient } from '$lib/clients/saferwall';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ url, parent, params }) => {
	const {
		file: { default_behavior_report: behaviorReport }
	} = await parent();

	if (!behaviorReport || !behaviorReport.id) {
		throw redirect(307, `/files/${params.hash}/summary`);
	}

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

	const pagination = await new SaferwallClient().getFileApiTrace(behaviorReport.id!, args);

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
