<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Table from '$lib/components/table';
	import type { Saferwall } from '$lib/types';
	import { valueToHex } from '$lib/utils';

	export let data: Saferwall.Pe.LoadConfig.Cfgiat[];

	const maxRecords = 40;
	$: expanded = false;
	$: onClickExpand = () => {
		expanded = !expanded;
	};
</script>

<Table.Root class="w-full">
	<Table.Header>
		<Table.Col class="lg:w-1/12">RVA</Table.Col>
		<Table.Col class="lg:w-1/12">IAT Value</Table.Col>
		<Table.Col class="lg:w-1/12">INT Value</Table.Col>
		<Table.Col class="lg:w-full">Description</Table.Col>
	</Table.Header>
	<Table.Body>
		{#each data as row, index}
			{#if index <= maxRecords || expanded}
				<Table.Row>
					<Table.Val>{valueToHex(row.RVA)}</Table.Val>
					<Table.Val>{valueToHex(row.IATValue)}</Table.Val>
					<Table.Val>{valueToHex(row.INTValue)}</Table.Val>
					<Table.Val>{row.Description}</Table.Val>
				</Table.Row>
			{/if}
		{/each}

		{#if data.length > maxRecords}
			<Table.Row>
				<Table.Val colspan="4">
					<ButtonShowMore bind:expanded on:click={onClickExpand} />
				</Table.Val>
			</Table.Row>
		{/if}
	</Table.Body>
</Table.Root>
