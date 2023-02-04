<script lang="ts">
	import { splitCamelCase, translateGroupValue, valueToHex } from '$lib/utils/format';
	import type { PageData } from './$types';

	const maxRecords = 20;
	export let data: PageData;

	$: exportData = data.exportData;

	$: exportHeaders = Object.entries(exportData.Struct).map(([key, value]) => {
		return {
			key: splitCamelCase(key),
			value: valueToHex(value),
			formated: translateGroupValue(value, 'Export', key)
		};
	});
</script>

<article class="space-y-4">
	<h1 class="title">Export</h1>
	<table class="w-full">
		<tbody>
			{#each exportHeaders as item}
				<tr>
					<td>{item.key}</td>
					<td>{item.value}</td>
					<td>{item.formated}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="mr-4 p-4 border rounded-xl overflow-x-scroll">
		<h2
			class="text-lg before:border-2 before:mr-2 before:border-primary text-primary font-semibold"
		>
			Functions
		</h2>
		<table class="items">
			<thead>
				<th>Name</th>
				<th>Ordinal</th>
				<th>Name RVA</th>
				<th>Function RVA</th>
				<th>Forwarder</th>
			</thead>
			<tbody>
				{#each exportData.Functions as entry}
					<tr>
						<td>{entry.Name}</td>
						<td>{entry.Ordinal}</td>
						<td>{valueToHex(entry.NameRVA)}</td>
						<td>{valueToHex(entry.FunctionRVA)}</td>
						<td>{entry.Forwarder}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- <ButtonShowAll bind:expanded on:mouseup={() => (expanded = !expanded)} /> -->
</article>

<style lang="scss">
	table.items {
		@apply w-full;

		tbody tr {
			@apply even:bg-gray-50;

			td {
				@apply py-2 w-1/4;
			}
		}
	}
</style>
