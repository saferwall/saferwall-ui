<script lang="ts">
	import Multitoggle from '$lib/components/Multitoggle.svelte';
	import type { Saferwall } from '$lib/types';
	import type { PageData } from './$types';
	import MetadataStreamHeaders from './tabs/MetadataStreamHeaders.svelte';
	import MetadataTables from './tabs/MetadataTables.svelte';
	import Struct from './tabs/Struct.svelte';

	export let data: PageData;

	const tabsLabelsMap: Record<keyof Saferwall.Pe.CLR.Root, string> = {
		clr_header: 'CLR HEADER',
		metadata_header: 'METADATA HEADER',
		metadata_stream_headers: 'METADATA STREAM HEDERS',
		metadata_tables: 'METADATA TABLES',
		metadata_tables_stream_header: 'METADATA TABLES STREAM HEADER'
	};

	const componentsClass: Record<keyof Saferwall.Pe.CLR.Root, any> = {
		clr_header: Struct,
		metadata_header: Struct,
		metadata_stream_headers: MetadataStreamHeaders,
		metadata_tables: MetadataTables,
		metadata_tables_stream_header: Struct
	};

	let { clr } = data;
	$: ({ clr } = data);

	let tabs: {
		label: string;
		value: any;
		checked?: boolean;
		data?: any;
		component?: any;
	}[] = clr
		? (Object.entries(clr) as [keyof typeof componentsClass, any][]).map(([key, value], index) => {
				return {
					label: tabsLabelsMap[key] ?? key,
					value: key,
					data: value,
					checked: key === 'clr_header',
					component: componentsClass?.[key]
				};
		  })
		: [];
</script>

<section class="flex flex-col gap-4 pr-4">
	<h1 class="title">CLR</h1>
	<div class="mt-4">
		<Multitoggle bind:items={tabs} border />
	</div>

	{#each tabs as tab}
		{#if tab.checked}
			<svelte:component this={tab.component} data={tab.data} />
		{/if}
	{/each}
</section>
