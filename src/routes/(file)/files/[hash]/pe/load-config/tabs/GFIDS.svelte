<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Table from '$lib/components/table';
	import { GFIDMap } from '$lib/data/translates';
	import type { Saferwall } from '$lib/types';
	import { valueToHex } from '$lib/utils';

	export let data: Saferwall.Pe.LoadConfig.Gfids[];

	const maxRecords = 20;
	$: expanded = false;
	$: onClickExpand = () => {
		expanded = !expanded;
	};
</script>

<Table.Root class="w-full">
	<Table.Header>
		<Table.Col class="lg:w-1/12">Target</Table.Col>
		<Table.Col class="lg:w-2/12">Flags</Table.Col>
		<Table.Col class="lg:w-full">Description</Table.Col>
	</Table.Header>
	<Table.Body>
		{#each data as row, index}
			{#if index < maxRecords || expanded}
				<Table.Row>
					<Table.Val>{valueToHex(row.Target)}</Table.Val>
					<Table.Val>{GFIDMap[row.Flags] ?? '-'}</Table.Val>
					<Table.Val>{row.Description}</Table.Val>
				</Table.Row>
			{/if}
		{/each}

		{#if data.length >= maxRecords}
			<Table.Row>
				<Table.Val colspan="4">
					<ButtonShowMore bind:expanded on:click={onClickExpand} />
				</Table.Val>
			</Table.Row>
		{/if}
	</Table.Body>
</Table.Root>
