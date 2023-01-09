import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ params, url }) => {
    throw redirect(301, `${url}/summary`);
}) satisfies PageLoad;