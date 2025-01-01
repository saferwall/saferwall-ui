<script lang="ts">
	import "../app.css";
	import "$lib/styles/vars.css";
	import NProgress from "nprogress";
	import { navigating } from "$app/stores";
	import { onMount, setContext } from "svelte";
	import { browser } from "$app/environment";
	import { isLight, parseTheme, Theme, theme } from "$lib/stores/theme";
	import { THEME_KEY } from "$lib/config";
	import type { LayoutServerData } from "./$types";
	import { writable } from "svelte/store";
	import type { Saferwall } from "$lib/types";

	export let data: LayoutServerData;

	const userStore = writable<Saferwall.User | undefined>(data?.user);
	setContext("user", userStore)
	$: $userStore = data.user;

	NProgress.configure({
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
	let mounted = false;
	onMount(() => {
		mounted = true;
		const localTheme = localStorage.getItem(THEME_KEY);
		if (localTheme) {
			$theme = parseTheme(localTheme);
		}
	})

	$: {
		if (mounted && browser) {
			document.cookie = `theme=${$theme}; max-age=${31_536_000}; path=/`;

			if ($theme === Theme.SYSTEM) {
				localStorage.removeItem(THEME_KEY);
			} else {
				localStorage.setItem(THEME_KEY, $theme);
			}
			document.documentElement.classList.toggle(Theme.LIGHT, $isLight);
			document.documentElement.classList.toggle(Theme.DARK, !$isLight);
		}
	}
</script>

<svelte:head>
	<title>Saferwall Beta 1.0</title>
</svelte:head>

<slot />