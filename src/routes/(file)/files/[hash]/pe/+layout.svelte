<script lang="ts">
	import type { PageData } from './$types';
	import BaseCard from '$lib/components/cards/BaseCard.svelte';
	import { peMenu } from '$lib/data/menus';

	export let data: PageData;

	$: activeMenu = data.activePEMenu;
	$: menus = [...peMenu].filter(({ field }) => data.file.pe?.meta.includes(field));
</script>

<div class="files__layout container mx-auto w-full h-full items-center justify-center">
	<BaseCard class="flex flex-col md:flex-row space-x-4" flex={false} padding={false}>
		<ul>
			{#each menus as item}
				<li><a class:active={item.path === activeMenu} href={item.path}>{item.title}</a></li>
			{/each}
		</ul>
		<div class="w-full h-full overflow-x-auto py-4">
			<slot />
		</div>
	</BaseCard>
</div>

<style lang="scss">
	ul {
		@apply flex flex-row md:flex-col shrink-0 md:p-4 overflow-y-auto;

		li {
			@apply shrink-0;

			a {
				@apply font-medium text-gray-400;
				@apply block py-4 pl-4 pr-10 border-b md:border-b-0 border-r md:rounded-l;

				&.active,
				&:hover {
					@apply bg-primary-100 bg-opacity-20 text-primary relative;

					&:after {
						@apply md:content-[''] md:border-r-4 border-primary h-full md:absolute md:-right-1 md:top-0;
					}
				}
			}
		}
	}

	.files__layout {
		@apply text-sm;
	}

	.files__layout :global(table thead) {
		@apply text-left;
	}

	.files__layout :global(table thead th) {
		@apply py-4 font-medium;
	}
	.files__layout :global(table tr td) {
		@apply py-2 text-gray-800;
	}

	.files__layout :global(.title) {
		@apply text-2xl font-semibold;
	}
</style>
