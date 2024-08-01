<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();

	export let loading = false;
	export let reachEnd = false;

	const onMouseUpLoadMore = () => {
		if (!loading) {
			dispatch('load');
		}
	};
</script>

{#if !reachEnd}
	<button
		on:click={onMouseUpLoadMore}
		class="w-full flex-center rounded cursor-pointer text-primary space-x-2 font-medium p-4"
	>
		<div class="flex-center space-x-1">
			{#if loading}
				<Icon name="loading" size="w-6 h-6" class="animate-spin" />
			{:else}
				<span><slot /></span>
				<Icon name="arrow-down" size="w-4 h-4" />
			{/if}
		</div>
	</button>
{/if}
