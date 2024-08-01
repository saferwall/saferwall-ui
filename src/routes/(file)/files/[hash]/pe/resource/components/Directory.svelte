<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import DirectoryEntry from './DirectoryEntry.svelte';
	import ResourceData from './ResourceData.svelte';

	export let entries: Saferwall.Resource.Entry[];
	export let struct: Saferwall.Resource.Struct[];
</script>

{#if entries}
	<ul class="--space-y-4">
		<li>
			<slot/>
		</li>
		{#each entries as entry}
			<li>
				<DirectoryEntry {...entry} />
			</li>
		{/each}
	</ul>
{:else}
	<ul>
		<li class="resource">
			<ResourceData {struct} />
		</li>
	</ul>
{/if}

<style lang="postcss">
	ul li {
		@apply ml-2;
		@apply relative;
		&:after, &:before {
			@apply content-[''] absolute;
		}
		&:after {
			@apply h-[1px] w-4 top-4 left-0 bg-zinc-300 dark:bg-zinc-700;
		}
		&:before {
			/* @apply border-l h-full; */
		}
	}
	ul li:not(:last-child):before {
		@apply border-l border-l-zinc-300 dark:border-l-zinc-700 h-full;
	}
	ul li:last-child :global(> article > div) {
		@apply relative;
		&:before {
			@apply content-[''] absolute;
			@apply border-l border-l-zinc-300 dark:border-l-zinc-700 !rounded-none h-full;
			@apply -top-[calc(0.8rem)] left-0 bg-zinc-300 dark:bg-zinc-700;
		}
	}
	ul li.resource :global(> article > div:first-child) {
		&:before {
			@apply h-[50%] top-[calc(0.1rem)];
		}
		}
	ul li.resource :global(> article > div:last-child:not(:first-child)) {
		&:before {
			@apply border-none;
		}
	}
</style>