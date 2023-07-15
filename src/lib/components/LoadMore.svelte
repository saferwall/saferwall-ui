<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let loading = false;
	export let reachEnd = false;
</script>

{#if !reachEnd}
	<div
		on:mouseup={() => !loading && dispatch('load')}
		class="w-full flex-center rounded cursor-pointer text-primary space-x-2 font-medium p-4"
	>
		<div class="flex-center space-x-1">
			{#if loading}
				<svg class="w-6 h-6 animate-spin">
					<use href="/images/icons.svg#icon-loading" />
				</svg>
			{:else}
				<span><slot /></span>
				<svg class="w-4 h-4">
					<use href="/images/icons.svg#icon-arrow-down" />
				</svg>
			{/if}
		</div>
	</div>
{/if}
