import { SaferwallClient } from '$lib/clients/saferwall.js';
import { env } from '$env/dynamic/public';

export async function GET({ fetch, params, url }) {
	const client = new SaferwallClient(undefined, fetch);

	const { default_behavior_report } = await client.request<{ default_behavior_report: { id: string } }>(
		`files/${params.hash}/?fields=default_behavior_report`
	);
	const newUrl = new URL(`${env.PUBLIC_API_URL}behaviors/${default_behavior_report.id}/${params.rest}${url.searchParams.size ? "?" + url.searchParams.toString() : ""}`);
	return new Response(JSON.stringify({ main: (await (await fetch(newUrl)).json()), default_behavior_report }));
};