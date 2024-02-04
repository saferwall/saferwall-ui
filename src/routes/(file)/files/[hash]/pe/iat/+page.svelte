<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import { valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	$: iats = data.iat;
	$: columns = ['Rva', 'Value', 'Meaning'];

	$: expanded = false;

	const maxRecords = 20;
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
				{#if i <= maxRecords || expanded}
					<tr>
						<td>{item.Index}</td>
						{#each columns as column}
							<td>{valueToHex(item[column])}</td>
						{/each}
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
	<ButtonShowMore bind:expanded on:click={onClickExpand} />
</article>
