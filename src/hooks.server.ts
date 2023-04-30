import { dev } from '$app/environment';
import { APIClient } from '$lib/api';
import { SESSION_KEY } from '$lib/config';
import type { User } from '$lib/types';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = (async ({ event, resolve }) => {
    if (dev) {
        const { fallBackPlatformToMiniFlareInDev } = await import('$lib/clients/miniflare');
        event.platform = await fallBackPlatformToMiniFlareInDev(event.platform);
    }

    try {
        const sessionData = event.cookies.get(SESSION_KEY);
        if (!sessionData) {
            return await resolve(event)
        }

        const session = JSON.parse(sessionData);
        const { username, token } = session;
        const user: User = await new APIClient().getUser(username);

        event.locals.session = session;
        event.locals.user = {
            username: user.username,
            email: user.email,
            name: user.name,
            admin: user.admin,
            type: user.type,
            member_since: user.member_since,
            confirmed: user.confirmed
        };
    } catch (error) {

    }

    return await resolve(event)
}) satisfies Handle;

