<script lang="ts">
	import { translateGroupValue, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	$: richHeaders = data.richHeader?.CompIDs;
	$: columns = Object.keys(data.richHeader?.CompIDs[0]);
</script>

<article>
	<h1 class="title">Rich Header</h1>
	<table class="w-full">
		<thead>
			{#each columns as column}
				<th>{column}</th>
			{/each}
			<th>MS internal Name</th>
			<th>Visual Studio Version</th>
		</thead>
		<tbody>
			{#each richHeaders as item}
				<tr>
					{#each columns as column}
						<td>{valueToHex(item[column])}</td>
					{/each}
					<td>{translateGroupValue(item?.ProdID, 'RichHeader', 'ProdID')}</td>
					<td>{translateGroupValue(item?.ProdID, 'RichHeader', 'MSinternalName')}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</article>
