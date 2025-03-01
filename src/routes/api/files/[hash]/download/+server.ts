import { SaferwallClient } from '$lib/clients/saferwall.js';
import { env } from '$env/dynamic/public';
import { SESSION_KEY } from '$lib/config';
import { redirect } from '@sveltejs/kit';

export async function GET({ fetch, params, cookies }) {
	const cookieString = await cookies.get(SESSION_KEY);
	if (cookieString) {
		const client = new SaferwallClient(JSON.parse(cookieString), fetch);
		let res = await fetch(`${env.PUBLIC_API_URL}files/${params.hash}/download/`, {
			headers: {
				"Authorization": client.authorization!,
				"Content-Type": "application/json",
			}
		})
		if (res.status === 401) {
			redirect(301, "/auth/login");
		}

		return new Response(res.body, {
			headers: {
				'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
				'Content-Length': res.headers.get('Content-Length') || '',
				'Content-Disposition': res.headers.get('Content-Disposition') || 'attachment; filename="downloaded-file"',
			},
		});
	}
	redirect(301, "/auth/login");
};