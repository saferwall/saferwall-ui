import { SaferwallClient } from '$lib/clients/saferwall.js';
import { env } from '$env/dynamic/public';
import { SESSION_KEY } from '$lib/config';
import { redirect } from '@sveltejs/kit';

export async function GET({ fetch, params, cookies }) {
	const cookieString = await cookies.get(SESSION_KEY);
	if (cookieString) {
		const client = new SaferwallClient(JSON.parse(cookieString), fetch);
		let res = await fetch(
			`${env.PUBLIC_API_URL}files/${params.hash}/download/`
			// "https://testfile.org/files-5GB"
		, {
			headers: {
				"Authorization": client.authorization!,
				"Content-Type": "application/json",
			}
		})
		if (res.status === 401) {
			redirect(301, "/auth/login");
		}
		return res;
	}
	redirect(301, "/auth/login");
};