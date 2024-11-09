import { browser } from '$app/environment';
import { THEME_KEY } from '$lib/config';
import { derived, writable, type Readable } from 'svelte/store';

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
export const isLight = derived([theme, systemPrefersDarkMode], ([theme, { matches: prefersDark }]) => theme === Theme.LIGHT || (theme === Theme.SYSTEM && !prefersDark))
export const themeString: Readable<"dark" | "light"> = derived(isLight, (isLight) => (["dark", "light"] as const)[Number(isLight)]);
export const oppositeThemeString = derived(isLight, (isLight) => ["dark", "light"][Number(!isLight)]);


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
