<script lang="ts">
	import { twMerge } from "tailwind-merge";

	let Class = ""
	export { Class as class }
	export let name: string;
	export let size = 'w-6 h-6';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg on:click class={twMerge("icon", size, Class)}>
	<use href="/images/icons.svg#icon-{name}" />
</svg>
