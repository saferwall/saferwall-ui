<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Tabs, { type TabItem } from '$lib/components/tabs';
	import type { Saferwall } from '$lib/types';
	import { convertBytes, valueToHex } from '$lib/utils';

	export let data: Saferwall.Pe.LoadConfig.VolatileMetadata;

	const maxRecords = 20;

	let tabs: (TabItem & Partial<{ data: any; key: string; expanded: boolean }>)[] = [
		{
			label: 'Struct',
			data: data.struct,
			key: 'struct',
			selected: true
		},
		{
			label: 'Access RVA Table',
			data: data.access_rva_table,
			key: 'accessrvatable',
			expanded: false
		},
		{
			label: 'Info Range Table',
			data: data.info_range_table.map(({ rva, size }) => [valueToHex(rva), convertBytes(size)]),
			key: 'info_range_table'
		}
	];
</script>

<Tabs.Root bind:tabs center>
	<div class="py-4">
		{#each tabs as tab}
			{#if tab.selected}
				{#if tab.key === 'accessrvatable'}
					<div class="p-6 border border-zinc-300 dark:border-zinc-700 rounded-xl flex flex-col gap-4">
						<ul class="space-y-2 text-md">
							{#each tab.data as item, index}
								{#if index < maxRecords || tab.expanded}
									<li class="font-mono">
										{valueToHex(item)}
									</li>
								{/if}
							{/each}
						</ul>
						<ButtonShowMore
							expanded={tab.expanded}
							on:click={() => (tab.expanded = !tab.expanded)}
						/>
					</div>
				{/if}
				{#if tab.key === 'info_range_table'}
					<TableKeyValue {maxRecords} camelCase={false} items={tab.data} header={['RVA', 'Size']} />
				{/if}
				{#if tab.key === 'struct'}
					<TableKeyValue items={Object.entries(tab.data)} header={false} />
				{/if}
			{/if}
		{/each}
	</div>
</Tabs.Root>
