<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let active: string | undefined = undefined;
	export let items: string[] = [];

	const dispatch = createEventDispatcher();
	let activeItem = active || items[0] || '';

	const setActive = (item: string): void => {
		activeItem = item;
		dispatch('change', item);
	};
</script>

<ul class="multitoggle">
	{#each items as item}
		<li on:mouseup={() => setActive(item)} class="item" class:active={activeItem == item}>
			{item}
		</li>
	{/each}
</ul>

<style lang="scss">
	.multitoggle {
		@apply flex items-center p-1 rounded-full border border-grayx space-x-1;

		.item {
			@apply py-2 px-4 rounded-full;
			@apply text-grayx-500 cursor-pointer;

			&:hover,
			&.active {
				@apply bg-primary text-white;
			}
		}
	}
</style>
