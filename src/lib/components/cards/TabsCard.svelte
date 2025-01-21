<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Card from '../Card.svelte';

	interface TabItem {
		title: string;
		count?: number;
		url?: string;
		active?: boolean;
	}

	const dispatch = createEventDispatcher();

	export let direction: 'vertical' | 'horizontal' = 'vertical';
	export let heading: TabItem[] = [];

	$: items = heading;

	const onTabMouseUp = (tab: TabItem) => {
		heading = heading.map((item) => ((item.active = item.title === tab.title), item));
		dispatch('change', tab);
	};
</script>

<Card class={`card__tabs ${direction}`} padding={false}>
	<div class="tabs__menu no-scroll-style" data-sveltekit-preload-data="hover">
		<slot name="heading">
			{#each items as item}
				{#if item.url}
					<a href={item.url} class="card__tabs__item" class:active={item.active}>
						<span>{item.title}</span>

						{#if item.count != undefined}
							<span class="text-xs text-gray-400">({item.count})</span>
						{/if}
					</a>
				{:else}
					<span
						on:click={() => onTabMouseUp(item)}
						class="card__tabs__item"
						class:active={item.active}
					>
						<span>{item.title}</span>
						{#if item.count != undefined}
							<span class="text-xs text-gray-400">({item.count})</span>
						{/if}
					</span>
				{/if}
			{/each}
		</slot>
	</div>
	<div class="px-6 md:px-10 flex-grow">
		<slot />
	</div>
</Card>

<style lang="postcss">
	:global(.card__tabs) {
		@apply space-y-0;

		.card__tabs__item:hover,
		.active {
			@apply text-primary;
		}

		.card__tabs__item:hover:after,
		.active:after {
			@apply font-semibold;
		}

		.tabs__menu {
			@apply flex;
		}

		.card__tabs__item {
			@apply relative inline-flex items-center flex-shrink-0 space-x-1;
			@apply cursor-pointer p-4 px-6 md:px-10 hover:text-primary;
		}
	}

	:global(.card__tabs.vertical) {
		@apply flex flex-col;

		.tabs__menu {
			@apply border-b border-zinc-200 dark:border-zinc-700 overflow-x-auto items-center;
		}

		.card__tabs__item:hover:after,
		.active:after {
			@apply content-[''] absolute w-full bottom-0 left-0;
			@apply border-b-2 border-brand-surface text-primary;
		}
	}

	:global(.card__tabs.horizontal) {
		@apply flex flex-row py-6;

		.tabs__menu {
			@apply flex flex-col border-r border-zinc-200 dark:border-zinc-700 space-y-4;
		}

		.card__tabs__item:hover:after,
		.active:after {
			@apply content-[''] absolute h-full top-0 right-0;
			@apply border-r-2 border-brand-surface text-primary;
		}

		.card__tabs__item {
			@apply py-1;
		}
	}
</style>
