<script lang="ts">
	import Icon from './Icon.svelte';
	import { isLight, oppositeThemeString, Theme, theme } from "$lib/stores/theme";
</script>

<button
	type="button"
	on:click={() => {
		$theme = $isLight ? Theme.DARK : Theme.LIGHT;
	}}
	class="flex-center w-10 h-10 rounded-full border bg-transparent text-gray-500 border-neutral-700 hover:bg-gray-800 hover:text-gray-200 hover:border-gray-800"
>
	<Icon size="w-4 h-4" name="{$oppositeThemeString}-mode" />
</button>
