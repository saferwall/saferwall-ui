<script lang="ts">
	import { theme, toggleTheme } from '$lib/stores/theme';
	import Icon from './Icon.svelte';
</script>

<button
	type="button"
	on:click={toggleTheme}
	class="flex-center w-10 h-10 rounded-full border bg-transparent text-gray-500 border-neutral-700 hover:bg-gray-800 hover:text-gray-200 hover:border-gray-800"
>
	<Icon size="w-4 h-4" name={$theme + '-mode'} />
</button>
