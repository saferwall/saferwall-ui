import { browser } from '$app/environment';
import { THEME_KEY } from '$lib/config';
import { writable } from 'svelte/store';

export enum Theme {
	DARK = 'dark',
	LIGHT = 'light',
	SYSTEM = 'system'
}

export const theme = writable<Theme>(Theme.SYSTEM);

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
