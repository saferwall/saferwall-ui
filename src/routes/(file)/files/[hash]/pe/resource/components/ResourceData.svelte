<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Saferwall } from '$lib/types';
	import DirectoryTable from './DirectoryTable.svelte';

	let tableOpen = false;

	export let struct: Saferwall.Resource.Struct;
	const onClickTableButton = () => (tableOpen = !tableOpen);
</script>

<!-- <li> -->
	<article class="pl-8 --rounded-sm group w-full" class:open={tableOpen}>
		<div class="text-base pl-8 -ml-8 font-medium flex items-center space-x-2 resource">
			<button on:click={() => (tableOpen = !tableOpen)} class="flex gap-2 items-center !border-none">
				<Icon name="arrow-down" class="{tableOpen ? '' : '-rotate-90'} transition-transform" size="w-4 h-4" />
				<h3 class="cursor-pointer">
					{tableOpen ? 'Hide' : 'Show'} Resource Data Entry Table
				</h3>
			</button>
		</div>
		{#if tableOpen}
			<div class="pl-4 py-2">
				<DirectoryTable {struct} />
			</div>
		{/if}
	</article>
<!-- </li> -->
