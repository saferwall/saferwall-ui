<script lang="ts">
	import type { TabItem } from '.';
	import Card from '../Card.svelte';
	import TabHeader from './TabHeader.svelte';

	export let center = false;
	export let padding = false;
	export let tabs: TabItem[] = [];
	export let direction: 'vertical' | 'horizontal' = 'vertical';
</script>

<Card class={`card__tabs ${direction}`} {padding}>
	<div class="tabs__menu no-scroll-style" class:center data-sveltekit-preload-data="hover">
		<slot name="tabs">
			<TabHeader
				on:change
				bind:items={tabs}
				vertical={direction === 'vertical'}
				horizontal={direction === 'horizontal'}
			/>
		</slot>
	</div>
	<div class="flex-grow">
		<slot />
	</div>
</Card>

<style lang="postcss">
	:global(.card__tabs) {
		@apply space-y-0;

		.tabs__menu {
			@apply flex items-center;

			&.center {
				@apply justify-center;
			}
		}
	}

	:global(.card__tabs.vertical) {
		@apply flex flex-col;

		.tabs__menu {
			@apply border-b border-zinc-300 dark:border-zinc-600 overflow-x-auto items-center;
		}
	}

	:global(.card__tabs.horizontal) {
		@apply flex flex-row py-6;

		.tabs__menu {
			@apply flex flex-col border-r border-zinc-300 dark:border-zinc-600 space-y-4;
		}
	}
</style>
