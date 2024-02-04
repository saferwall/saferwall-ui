<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Table from '$lib/components/table';
	import type { Saferwall } from '$lib/types';

	export let data: Saferwall.Pe.CLR.MetadataTables;

	$: rows = Object.values(data);

	const maxRecords = 40;
	$: expanded = false;
	$: onClickExpand = () => {
		expanded = !expanded;
	};
</script>

<Table.Root>
	<Table.Header>
		<Table.Col class="lg:w-1/6">Name</Table.Col>
		<Table.Col>Content</Table.Col>
		<Table.Col class="lg:w-1/6">Count Cols</Table.Col>
		<Table.Col class="lg:w-1/6">Record Size</Table.Col>
	</Table.Header>
	<Table.Body>
		{#each rows as row, index}
			{#if index < maxRecords || expanded}
				<Table.Row>
					<Table.Val>{row.Name}</Table.Val>
					<Table.Val>
						{#if row.Content && typeof row.Content === 'object'}
							<TableKeyValue items={Object.entries(row.Content)} header={false} />
						{:else}
							{row.Content}
						{/if}
					</Table.Val>
					<Table.Val>{row.CountCols}</Table.Val>
					<Table.Val>{row.SizeRecord}</Table.Val>
				</Table.Row>
			{/if}
		{/each}

		{#if rows.length >= maxRecords}
			<Table.Row>
				<Table.Val colspan="4">
					<ButtonShowMore bind:expanded on:click={onClickExpand} />
				</Table.Val>
			</Table.Row>
		{/if}
	</Table.Body>
</Table.Root>
