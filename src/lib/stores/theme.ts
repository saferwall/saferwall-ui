import { browser } from '$app/environment';
import { THEME_KEY } from '$lib/config';
import { writable, type Readable } from 'svelte/store';

export enum Theme {
	DARK = 'dark',
	LIGHT = 'light',
	SYSTEM = 'system'
}

export const theme = writable<Theme>(Theme.SYSTEM);

export const systemPrefersDarkMode: Readable<{ matches: boolean }> = {
	subscribe(callback) {
		if (!browser) {
			callback({ matches: true });
			return () => {}
		}
		const windowMatchMedia = window.matchMedia("(prefers-color-scheme: dark)");
		callback(windowMatchMedia); // get initial
		windowMatchMedia.addEventListener("change", callback) // listen for change
		return () => {
			windowMatchMedia.removeEventListener("change", callback);
		}
	}
}

export const parseTheme = (input: unknown) => {
	switch (input) {
		case Theme.DARK:
			return Theme.DARK;
		case Theme.LIGHT:
			return Theme.LIGHT;
		default:
			return Theme.SYSTEM;
	}
};

export const toggleTheme = () => {
	theme.update((oldTheme) => (oldTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK));
};

if (browser) {
	const localTheme = localStorage.getItem(THEME_KEY);
	if (localTheme) {
		theme.set(parseTheme(localTheme));
	}

	theme.subscribe((newTheme) => {
		document.cookie = `theme=${newTheme}; max-age=${31_536_000}; path=/`;

		if (newTheme === Theme.SYSTEM) {
			localStorage.removeItem(THEME_KEY);
		} else {
			localStorage.setItem(THEME_KEY, newTheme);
		}

		if (newTheme === Theme.DARK) {
			document.documentElement.classList.add(Theme.DARK);
		} else {
			document.documentElement.classList.remove(Theme.DARK);
		}
	});
}
