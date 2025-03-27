import { SaferwallClient } from '$lib/clients/saferwall.js';
import { env } from '$env/dynamic/public';
import { SESSION_KEY } from '$lib/config';
import { redirect } from '@sveltejs/kit';

export async function POST({ fetch, cookies, request }) {
	const cookieString = await cookies.get(SESSION_KEY);
	if (cookieString) {
		try {
			const client = new SaferwallClient(JSON.parse(cookieString), fetch);
			const formData = await request.formData();
			let data = formData.get("hashes");
			if (typeof data !== "string") {
				redirect(302, "/");
			}
			console.log({data, body: JSON.stringify({ hashes: JSON.parse(data) }),});
			let res = await fetch(
				`${env.PUBLIC_API_URL}files/download/`,
				{
					headers: {
						"Authorization": client.authorization!,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ hashes: JSON.parse(data) }),
					method: "POST",
				},
			)
			if (res.status === 401) {
				redirect(302, "/auth/login");
			}
			return res;
		} catch (e) {
			console.log(e);
			// redirect(302, "/auth/logout");
		}
	}
	redirect(302, "/auth/login");
};