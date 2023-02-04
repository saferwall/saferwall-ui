<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import { translateGroupValue, valueToHex } from '$lib/utils/format';
	import type { PageData } from './$types';

	const maxRecords = 20;
	export let data: PageData;

	$: columns = ['Rva', 'Value', 'Meaning'];
	$: iats = data.iat;

	$: expanded = false;
</script>

<article>
	<h1 class="title">IAT</h1>
	<table class="w-full">
		<thead>
			<th>#</th>
			{#each columns as column}
				<th>{column}</th>
			{/each}
		</thead>
		<tbody>
			{#each iats as item, i}
				<tr class:hidden={!expanded && i > maxRecords}>
					<td>{item.Index}</td>
					{#each columns as column}
						<td>{valueToHex(item[column])}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<ButtonShowMore bind:expanded on:mouseup={() => (expanded = !expanded)} />
</article>
