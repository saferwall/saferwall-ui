import { APP_VISITED_KEY } from "$lib/config";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
	cookies.set(APP_VISITED_KEY, "true", {
		httpOnly: true,
		secure: true,
		path: '/'
	})
	redirect(301, "/");
}) satisfies PageServerLoad;