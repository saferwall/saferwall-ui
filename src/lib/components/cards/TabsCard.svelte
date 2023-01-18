<script lang="ts">
	import BaseCard from './BaseCard.svelte';

	export let heading: { title: string; count?: number; url: string; active?: boolean }[] = [];
</script>

<BaseCard class="card__tabs" padding={false}>
	<div
		class="border-b flex overflow-x-auto no-scroll-style items-center"
		data-sveltekit-preload-data="hover"
	>
		<slot name="heading">
			{#each heading as item}
				<a href={item.url} class="card__tabs__item" class:active={item.active}>
					{item.title}

					{#if item.count != undefined}
						<span class="text-sm text-gray-400">({item.count})</span>
					{/if}
				</a>
			{/each}
		</slot>
	</div>
	<div class="px-6 md:px-10">
		<slot />
	</div>
</BaseCard>

<style lang="scss">
	:global(.card__tabs) {
		@apply space-y-0;

		.card__tabs__item:hover,
		.active {
			@apply text-primary;
		}
		.card__tabs__item:hover:after,
		.active:after {
			@apply content-[''] absolute w-full bottom-0 left-0;
			@apply border-b-2 border-primary text-primary;
		}
	}

	:global(.card__tabs__item) {
		@apply cursor-pointer;
		@apply relative flex-shrink-0;
		@apply p-4 px-6 md:px-10 hover:text-primary;
	}
</style>
