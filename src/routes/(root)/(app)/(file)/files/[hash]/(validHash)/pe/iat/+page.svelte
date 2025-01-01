<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Table from '$lib/components/table';
	import { valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	$: rows = data.iat ?? [];
	$: columns = ['rva', 'value', 'meaning'];

	$: expanded = false;
	$: colsLength = columns.length + 1;

	const maxRecords = 20;
	const onClickExpand = () => {
		expanded = !expanded;
	};
</script>

<article>
	<h1 class="title">IAT</h1>
	<Table.Root class="w-full">
		<Table.Header>
			<Table.Col>#</Table.Col>
			{#each columns as column}
				<Table.Col>{column}</Table.Col>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each rows as row, index}
				{#if index < maxRecords || expanded}
					<Table.Row>
						<Table.Val>{row.index}</Table.Val>
						{#each columns as column}
							<Table.Val>{valueToHex(row[column])}</Table.Val>
						{/each}
					</Table.Row>
				{/if}
			{/each}
			{#if rows.length >= maxRecords}
				<Table.Row>
					<Table.Val colspan={colsLength}>
						<ButtonShowMore bind:expanded on:click={onClickExpand} />
					</Table.Val>
				</Table.Row>
			{/if}
		</Table.Body>
	</Table.Root>
</article>
