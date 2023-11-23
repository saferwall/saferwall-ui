<script script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Saferwall } from '$lib/types';
	import DirectoryComponent from './Directory.svelte';
	import DirectoryTable from './DirectoryTable.svelte';

	export let isRoot = false;

	export let ID: string;
	export let Name: string;
	export let Directory: Saferwall.Resource.Directory;
	export let Struct: Saferwall.Resource.Struct;

	$: structOpen = false;
	$: tableOpen = false;
</script>

<article class="pl-8 rounded group w-full" class:open={structOpen} class:isRoot>
	<div class="text-md font-medium flex items-center space-x-2">
		<Icon name="arrow-down" class={structOpen ? '' : '-rotate-90'} size="w-4 h-4" />
		<h3 class="cursor-pointer" on:mouseup={() => (structOpen = !structOpen)}>
			Resource Directory
			{#if ID}
				Entry {ID}
			{/if}
			{#if Name}
				, Name: {Name}
			{/if}
		</h3>
		{#if Struct}
			<div class="py-1 relative">
				<Button
					size="xss"
					on:mouseup={() => (tableOpen = !tableOpen)}
					class={tableOpen ? `!text-red-500 !bg-gray-100 !outline-gray-100 !border-gray-100` : ''}
				>
					{tableOpen ? 'Hide Table' : 'Show Table'}
				</Button>
				{#if tableOpen}
					<div class="absolute block left-44 top-0 z-40">
						<DirectoryTable {Struct} />
					</div>
				{/if}
			</div>
		{/if}
	</div>
	{#if structOpen}
		{#if Directory}
			<DirectoryComponent {...Directory} />
		{/if}
		<div class="relative" />
	{/if}
</article>

<style lang="scss">
	.isRoot {
		@apply -ml-4;
	}
	.open {
		@apply relative;

		&:before,
		&:after {
			@apply content-[''] absolute;
		}
		&:before {
			@apply top-7 mt-0.5 left-8 ml-2 z-30;
			@apply h-8 w-[1px] bg-neutral-200;
		}

		&:after {
			@apply top-14 mt-1.5 left-8 ml-2 z-30;
			@apply w-5 h-[1px] bg-neutral-200;
		}
	}
</style>
