import { dev } from '$app/environment';
import { SaferwallClient } from '$lib/clients/saferwall';
import { SESSION_KEY, THEME_KEY } from '$lib/config';
import { parseTheme } from '$lib/stores/theme';
import type { Saferwall } from '$lib/types';
import type { Handle, HandleServerError } from '@sveltejs/kit';

const resolveEvent: Handle = ({ resolve, event }) => {
	const theme = parseTheme(event.cookies.get(THEME_KEY));

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('data-theme', `class="${theme}"`);
		}
	});
};

export const handle: Handle = (async ({ event, resolve }) => {
	if (dev) {
		const { fallBackPlatformToMiniFlareInDev } = await import('$lib/clients/miniflare');
		event.platform = await fallBackPlatformToMiniFlareInDev(event.platform!);
	}

	const client = new SaferwallClient(undefined, event.fetch);
	event.locals.client = client;
	try {
		const sessionData = event.cookies.get(SESSION_KEY);
		if (!sessionData) {
			return resolveEvent({ event, resolve });
		}

		const session = JSON.parse(sessionData);
		client.setSession(session);
		const user = await client.getUser(session.username);

		event.locals.session = session;
		event.locals.user = [
			'username',
			'name',
			'location',
			'url',
			'bio',
			'confirmed',
			'member_since',
			'admin',
			'email'
		].reduce(
			(finalUserData, key) => ({
				...finalUserData,
				[key]: user[key as keyof typeof user]
			}),
			{} as Saferwall.User
		);
	} catch (error) {
		console.error('hooks error: ', error);
	}

	return resolveEvent({ event, resolve });
}) satisfies Handle;

export const handleError = (async ({ error, event }: any) => {
	event.cookies.delete(SESSION_KEY, {
		httpOnly: true,
		secure: true,
		path: '/'
	});

	console.error('[hook] handle error', error);

	return {
		message: error?.message,
		status: error?.status
	};
}) satisfies HandleServerError;
