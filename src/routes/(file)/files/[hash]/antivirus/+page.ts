import type { Saferwall } from '$lib/types';
import { orderObjectKeys } from '$lib/utils';
import type { PageLoad } from './$types';

export const load = (async ({ params: { hash }, parent }) => {
	const { client } = await parent();

	const antivirus = await client.request<Saferwall.Antivirus>(
		`files/${hash}?fields=multiav,first_seen,last_scanned`
	);

	const allAntivirus = Object.keys({
		...(antivirus.multiav.first_scan ?? {}),
		...(antivirus.multiav.last_scan ?? {})
	});

	const syncAntivirus = (source: typeof antivirus.multiav.last_scan, item: string) => {
		if (source && !source[item]) {
			source[item] = {
				infected: undefined,
				output: 'N/A',
				update: 0
			};
		}
	};

	allAntivirus.forEach((item) => {
		syncAntivirus(antivirus.multiav.last_scan, item);
		syncAntivirus(antivirus.multiav.first_scan, item);
	});

	antivirus.multiav.first_scan = orderObjectKeys(antivirus.multiav.first_scan);
	antivirus.multiav.last_scan = orderObjectKeys(antivirus.multiav.last_scan);

	return {
		antivirus
	};
}) satisfies PageLoad;
