<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Table from '$lib/components/table';
	import { translateKeyToTitle, translateGroupValue, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	$: exportData = data.exportData;

	$: exportHeaders = Object.entries(exportData.struct).map(([key, value]) => {
		return {
			key: translateKeyToTitle(key),
			value: valueToHex(value),
			formated: translateGroupValue(value, 'export', key)
		};
	});

	$: rows = exportData.functions ?? [];

	const maxRecords = 20;
	$: expanded = false;
	$: onClickExpand = () => {
		expanded = !expanded;
	};
</script>

<article class="space-y-4">
	<h1 class="title">Export</h1>
	<Table.Root>
		<Table.Body>
			{#each exportHeaders as item}
				<Table.Row>
					<Table.Val>{item.key}</Table.Val>
					<Table.Val>{item.value}</Table.Val>
					<Table.Val>{item.formated}</Table.Val>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
	<div class="mr-4 p-4 border rounded-xl overflow-x-scroll">
		<h2
			class="text-lg before:border-2 before:mr-2 before:border-primary text-primary font-semibold"
		>
			Functions
		</h2>
		<Table.Root striped={true}>
			<Table.Header>
				<Table.Col>Name</Table.Col>
				<Table.Col>Ordinal</Table.Col>
				<Table.Col>Name RVA</Table.Col>
				<Table.Col>Function RVA</Table.Col>
				<Table.Col>Forwarder</Table.Col>
			</Table.Header>
			<Table.Body>
				{#each rows as entry, index}
					{#if index < maxRecords || expanded}
						<Table.Row>
							<Table.Val>{entry.name}</Table.Val>
							<Table.Val>{entry.ordinal}</Table.Val>
							<Table.Val>{valueToHex(entry.name_rva)}</Table.Val>
							<Table.Val>{valueToHex(entry.function_rva)}</Table.Val>
							<Table.Val>{entry.forwarder}</Table.Val>
						</Table.Row>
					{/if}
				{/each}
				{#if rows.length >= maxRecords}
					<Table.Row>
						<Table.Val colspan="5">
							<ButtonShowMore bind:expanded on:click={onClickExpand} />
						</Table.Val>
					</Table.Row>
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
</article>
