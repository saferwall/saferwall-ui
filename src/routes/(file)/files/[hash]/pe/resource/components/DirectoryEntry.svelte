<script script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Saferwall } from '$lib/types';
	import DirectoryComponent from './Directory.svelte';
	import DirectoryTable from './DirectoryTable.svelte';

	export let isRoot = false;

	export let id: string;
	export let name: string;
	export let directory: Saferwall.Resource.Directory;
	export let struct: Saferwall.Resource.Struct;

	$: structOpen = false;
	$: tableOpen = false;

	const onClickToggleTable = () => {
		tableOpen = !tableOpen;
	};
</script>

<article class="pl-8 rounded group w-full not-table" class:open={structOpen} class:isRoot>
	<div class="text-base pl-8 -ml-8 font-medium flex items-center space-x-2">
		<button on:click={() => (structOpen = !structOpen)} class="flex gap-2 items-center !border-none">
			<Icon name="arrow-down" class="{structOpen ? '' : '-rotate-90'} transition-transform" size="w-4 h-4" />
			<h3 class="cursor-pointer">
				{`Resource Directory${id ? ` Entry ${id}` : ""}${name ? `, Name: ${name}`: ""}`}
			</h3>
		</button>
	</div>
	{#if structOpen}
		{#if directory}
			<DirectoryComponent {...directory} >
				<article class="pl-8 rounded group w-full" class:open={tableOpen}>
					<div class="text-base pl-8 -ml-8 font-medium flex items-center space-x-2">
						<button on:click={() => (tableOpen = !tableOpen)} class="flex gap-2 items-center !border-none">
							<Icon name="arrow-down" class="{tableOpen ? '' : '-rotate-90'} transition-transform" size="w-4 h-4" />
							<h3 class="cursor-pointer">
								{tableOpen ? 'Hide Table' : 'Show Table'}
							</h3>
						</button>
					</div>
					{#if tableOpen}
						<div class="pl-4 py-2">
							<DirectoryTable {struct} />
						</div>
					{/if}
				</article>
			</DirectoryComponent>
		{/if}
		<div class="relative" />
	{/if}
</article>

<style lang="postcss">
	.isRoot {
		@apply -ml-4;
	}
</style>
