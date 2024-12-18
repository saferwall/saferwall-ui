<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Card from '$lib/components/Card.svelte';
	import { peMenu } from '$lib/data/menu';
	import type { Saferwall } from '$lib/types';
	import { peMenuStore } from '$lib/utils/fileMenu';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: activeMenu = peMenu.filter((menu) =>
		$peMenuStore.includes(menu.field as Saferwall.PeMeta)
	);
</script>

<section class="pe container mx-auto w-full h-full items-center justify-center">
	<Card class="flex flex-col md:flex-row space-x-4" flex={false} padding={false}>
		<ul>
			{#each activeMenu as item}
				<li>
					<a class:active={item.path === data.menu} href="/files/{data.hash}/pe/{item.path}{$page.url.search}" on:click|preventDefault={(e) =>
						// @ts-ignore
						goto(e.target?.href || "")}
					>
						{item.title}
					</a>
				</li>
			{/each}
		</ul>
		<div class="w-full h-full overflow-x-auto py-4">
			<slot />
		</div>
	</Card>
</section>

<style lang="postcss">
	.pe {
		@apply text-xs;

		:global(table thead) {
			@apply text-left;
		}

		:global(table thead th) {
			@apply py-2 px-4 font-semibold;
		}

		:global(table tr td) {
			@apply py-2 px-4 text-zinc-800 dark:text-zinc-100;
		}

		:global(.title) {
			@apply text-2xl font-semibold;
		}

		ul {
			@apply flex flex-row md:flex-col shrink-0 md:p-4 overflow-y-auto;

			li {
				@apply shrink-0;

				a {
					@apply font-medium text-secondary-text;
					@apply block py-4 pl-4 pr-10 border-b md:border-b-0 border-r border-r-line-surface md:rounded-l;

					&.active {
						@apply bg-brand-CF-surface text-primary-text relative font-semibold;

						&:after {
							@apply md:content-[''] md:border-r-4 border-brand-surface h-full md:absolute md:-right-1 md:top-0;
						}
					}
					&:hover {
						@apply text-primary-text;
					}
				}
			}
		}
	}
</style>
