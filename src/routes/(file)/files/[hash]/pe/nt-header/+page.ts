import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params: { hash }, parent }) => {
	const { client } = await parent();
	const { pe } = await client.request<Saferwall.File>(`files/${hash}?fields=pe.nt_header`);

	const signature = pe.nt_header?.signature;
	if (signature) {
		pe.nt_header.file_header.signature = signature;
		delete pe.nt_header?.signature;
	}

	const dataDirectory = pe.nt_header?.optional_header?.data_directories;
	if (dataDirectory) {
		pe.nt_header.data_directories = dataDirectory;
		delete pe.nt_header?.optional_header?.data_directories;
	}

	return {
		ntHeader: pe.nt_header
	};
}) satisfies PageLoad;
