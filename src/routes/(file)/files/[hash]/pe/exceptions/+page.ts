import { Configuration, FileApi } from '$lib/api';
import type { Saferwall } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	console.log({params})
	const { client } = await parent();
	console.log({client});
	// const { pe } = await client.request<Saferwall.File>(`files/${params.hash}?fields=pe.exceptions`);
	let c = new FileApi(new Configuration(client.session ? {accessToken: client.session?.token} : {}));
	let res = await c.filesSha256Get(params.hash, { params: { fields: "pe.exceptions" } })
	console.log({res});
	return {
		exceptions: [] as any[]
	};
}) satisfies PageLoad;
