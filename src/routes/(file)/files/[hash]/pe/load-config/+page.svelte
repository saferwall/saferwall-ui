<script lang="ts">
	import Multitoggle from '$lib/components/Multitoggle.svelte';
	import type { Saferwall } from '$lib/types';
	import type { PageData } from './$types';
	import CFGIAT from './tabs/CFGIAT.svelte';
	import CFGLongJump from './tabs/CFGLongJump.svelte';
	import DVRT from './tabs/DVRT.svelte';
	import GFIDS from './tabs/GFIDS.svelte';
	import LoadCfgStruct from './tabs/LoadCfgStruct.svelte';
	import SEH from './tabs/SEH.svelte';
	import VolatileMetadata from './tabs/VolatileMetadata.svelte';

	export let data: PageData;

	const tabsLabelsMap: Partial<Record<keyof Saferwall.Pe.LoadConfig.Root, string>> = {
		CFGIAT: 'CFG IAT',
		GFIDS: 'GFIDs',
		LoadCfgStruct: 'Load CFG Struct',
		SEH: 'SEH',
		VolatileMetadata: 'Volatile Metadata',
		CFGLongJump: 'CFG Long Jump'
	};

	const componentsClass: Record<keyof Saferwall.Pe.LoadConfig.Root, any> = {
		CFGIAT: CFGIAT,
		GFIDS: GFIDS,
		LoadCfgStruct: LoadCfgStruct,
		SEH: SEH,
		VolatileMetadata: VolatileMetadata,
		DVRT: DVRT,
		CFGLongJump: CFGLongJump
	};

	let { loadConfig } = data;
	$: ({ loadConfig } = data);

	let tabs: {
		label: string;
		value: any;
		checked?: boolean;
		data?: any;
		component?: any;
	}[] = loadConfig
		? (Object.entries(loadConfig) as [keyof typeof componentsClass, any][]).map(
				([key, value], index) => {
					return {
						label: tabsLabelsMap[key] ?? key,
						value: key,
						data: value,
						checked: index === 0,
						component: componentsClass?.[key]
					};
				}
		  )
		: [];
</script>

<section class="flex flex-col gap-4 pr-4">
	<h1 class="title">Load Config</h1>
	<div class="mt-4">
		<Multitoggle bind:items={tabs} border />
	</div>

	{#each tabs as tab}
		{#if tab.checked}
			<svelte:component this={tab.component} data={tab.data} />
		{/if}
	{/each}
</section>
