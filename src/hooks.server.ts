import { dev } from '$app/environment';
import { APIClient } from '$lib/api';
import { SESSION_KEY } from '$lib/config';
import type { User } from '$lib/types';
import type { Handle, HandleServerError } from '@sveltejs/kit';

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
        const user: User = await new APIClient().getUser(session.username);

        event.locals.session = session;
        event.locals.user =
            [
                'username', 'name',
                'location', 'url',
                'bio', 'confirmed',
                'member_since', 'admin',
                'email'
            ].reduce((obj: any, key) =>
                (obj[key] = (user as any)[key], obj), {}
            );

    } catch (error) {
        console.error('hooks error: ', error);
    }

    return await resolve(event)
}) satisfies Handle;

export const handleError = (async ({ error, event }: any) => {

    event.cookies.delete(SESSION_KEY, {
        httpOnly: true,
        secure: true,
        path: '/'
    });


    return {
        message: error?.message,
        status: error?.status,
    };
}) satisfies HandleServerError;
