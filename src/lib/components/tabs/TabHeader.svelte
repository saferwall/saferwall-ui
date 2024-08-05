<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TabItem } from '.';

	export let vertical = false;
	export let horizontal = false;
	export let items: TabItem[] = [];

	const dispatch = createEventDispatcher();

	const onTabMouseUp = (tab: TabItem) => {
		items = items.map((item) => ((item.selected = item.label === tab.label), item));
		dispatch('change', tab);
	};
</script>

{#each items as item}
	{#if item.url}
		<a
			class="tab__header__item"
			class:vertical
			class:horizontal
			class:active={item.selected}
			href={item.url}
		>
			<span>{item.label}</span>

			{#if item.count != undefined}
				<span class="text-xs text-gray-400">({item.count})</span>
			{/if}
		</a>
	{:else}
		<span
			class="tab__header__item"
			class:vertical
			class:horizontal
			class:active={item.selected}
			on:click={() => onTabMouseUp(item)}
		>
			<span>{item.label}</span>
			{#if item.count != undefined}
				<span class="text-xs text-gray-400">({item.count})</span>
			{/if}
		</span>
	{/if}
{/each}

<style lang="postcss">
	.tab__header__item {
		&:hover,
		&.active {
			@apply text-zinc-900 dark:text-zinc-100 bg-primary-100 dark:bg-zinc-700/70;
		}

		&:hover:after,
		&.active:after {
			@apply font-semibold;
		}

		@apply relative inline-flex items-center flex-shrink-0 space-x-1;
		@apply cursor-pointer p-4 px-6 md:px-10 hover:text-primary;

		&.vertical {
			@apply rounded-t;
			&:hover:after,
			&.active:after {
				@apply content-[''] absolute w-full bottom-0 left-0;
				@apply border-b-2 border-primary text-primary;
			}
		}

		&.horizontal {
			@apply rounded-l;
			@apply py-1;
			
			&:hover:after,
			&.active:after {
				@apply content-[''] absolute h-full top-0 right-0;
				@apply border-r-2 border-primary text-primary;
			}
		}
	}
</style>
