<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import Tabs, { type TabItem } from '$lib/components/tabs';
	import type { Saferwall } from '$lib/types';

	export let data: Saferwall.Pe.CLR.MetadataStreamHeader[];

	const maxRecords = 20;

	let tabs: (TabItem & Partial<{ data: any; key: string; expanded: boolean }>)[] = data.map(
		(item, index) => {
			const { name, ...data } = item;
			return {
				key: name,
				label: name,
				data: data,
				selected: index === 0
			};
		}
	);
</script>

<Tabs.Root bind:tabs center>
	<div class="py-4">
		{#each tabs as tab}
			{#if tab.selected}
				<TableKeyValue items={Object.entries(tab.data)} header={false} />
			{/if}
		{/each}
	</div>
</Tabs.Root>
