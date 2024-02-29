<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import type { Struct } from '$lib/types';
	import DirectoryTable from './DirectoryTable.svelte';

	let tableOpen = false;

	export let struct: Struct;
</script>

<div class="pl-8 flex items-center space-x-3 py-2">
	<h3 class="text-md font-bold">Resource Data Entry</h3>
	{#if struct}
		<div class="py-1 relative">
			<Button
				size="xss"
				on:click={() => (tableOpen = !tableOpen)}
				class={tableOpen ? `!text-red-500 !bg-gray-100 !outline-gray-100 !border-gray-100` : ''}
			>
				{tableOpen ? 'Hide Table' : 'Show Table'}
			</Button>
			{#if tableOpen}
				<div class="absolute block left-44 top-0 z-40">
					<DirectoryTable {struct} />
				</div>
			{/if}
		</div>
	{/if}
</div>
