<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let items: string[] = [];
	export let active: string | undefined = undefined;

	const dispatch = createEventDispatcher();

	let activeItem = active || items[0] || '';
	const onToggleMouseUp = (item: string): void => {
		activeItem = item;
		dispatch('change', item);
	};
</script>

<ul class="multitoggle">
	{#each items as item}
		<li on:mouseup={() => onToggleMouseUp(item)} class="item" class:active={activeItem == item}>
			{item}
		</li>
	{/each}
</ul>

<style lang="scss">
	.multitoggle {
		@apply flex items-center p-1 rounded-full border border-neutral space-x-1;

		.item {
			@apply py-2 px-4 rounded-full;
			@apply text-neutral-500 cursor-pointer;

			&:hover,
			&.active {
				@apply bg-primary text-white;
			}
		}
	}
</style>
