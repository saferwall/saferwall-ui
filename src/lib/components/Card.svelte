<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let flex = true;
	export let padding = true;
	export let spacing = true;
	export let border = false;
	
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article
	class="{twMerge("card relative overflow-hidden bg-neutral-600 text-gray-100 rounded", $$props.class)}"
	class:card--flex={flex}
	class:card--padding={padding}
	class:card--spacing={spacing}
	class:card--border={border}
	on:click|stopPropagation
>
	{#if $$slots.header}
		<div class="card--padding !pb-0">
			<slot name="header" />
		</div>
	{/if}
	<slot />
</article>
