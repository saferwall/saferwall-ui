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
					<Table.Val>{row.name}</Table.Val>
					<Table.Val>
						{#if row.content && typeof row.content === 'object'}
							<TableKeyValue items={Object.entries(row.content)} header={false} />
						{:else}
							{row.content}
						{/if}
					</Table.Val>
					<Table.Val>{row.count_cols}</Table.Val>
					<Table.Val>{row.size_record}</Table.Val>
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
