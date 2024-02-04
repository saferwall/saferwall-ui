<script lang="ts">
	export let flex = true;
	export let padding = true;
	export let spacing = true;
	export let shadow = true;
	export let border = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<article
	class="card relative overflow-hidden bg-white rounded-xl {$$props.class}"
	class:card--flex={flex}
	class:card--padding={padding}
	class:card--spacing={spacing}
	class:card--shadow={shadow}
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
