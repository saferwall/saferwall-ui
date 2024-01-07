<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import { valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	const maxIatRecords = 20;
	export let data: PageData;

	$: iats = data.iat;
	$: columns = ['Rva', 'Value', 'Meaning'];

	$: expanded = false;

	const onClickExpand = () => {
		expanded = !expanded;
	};
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
				<tr class:hidden={!expanded && i > maxIatRecords}>
					<td>{item.Index}</td>
					{#each columns as column}
						<td>{valueToHex(item[column])}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<ButtonShowMore bind:expanded on:click={onClickExpand} />
</article>
