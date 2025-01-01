<script lang="ts">
	import Multitoggle from '$lib/components/Multitoggle.svelte';
	import RenderObject from '$lib/components/nest/RenderObject.svelte';
	import type { Saferwall } from '$lib/types';
	import type { PageData } from './$types';
	import CFGIAT from './tabs/CFGIAT.svelte';
	import CFGLongJump from './tabs/CFGLongJump.svelte';
	import DVRT from './tabs/DVRT.svelte';
	import GFIDS from './tabs/GFIDS.svelte';
	import LoadCfgStruct from './tabs/LoadCfgStruct.svelte';
	import SEH from './tabs/SEH.svelte';
	import Struct from './tabs/Struct.svelte';
	import VolatileMetadata from './tabs/VolatileMetadata.svelte';

	export let data: PageData;

	const tabsLabelsMap: Partial<Record<keyof Saferwall.Pe.LoadConfig.Root, string>> = {
		cfgiat: 'CFG IAT',
		gfids: 'GFIDs',
		chpe: 'CHPE',
		enclave: 'ENCLAVE',
		load_cfg_struct: 'Load CFG Struct',
		seh: 'SEH',
		struct: 'STRUCT',
		dvrt: 'DVRT',
		volatile_metadata: 'Volatile Metadata',
		cfg_long_jump: 'CFG Long Jump'
	};

	const componentsClass: Partial<Record<keyof Saferwall.Pe.LoadConfig.Root, any>> = {
		cfgiat: CFGIAT,
		gfids: GFIDS,
		load_cfg_struct: LoadCfgStruct,
		seh: SEH,
		volatile_metadata: VolatileMetadata,
		dvrt: DVRT,
		cfg_long_jump: CFGLongJump
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
			{#if tab.data}
				{#if tab.component}
					<svelte:component this={tab.component} data={tab.data} />
				{:else}
					<!-- <Struct data={tab.data} /> -->
					<RenderObject obj={tab.data}></RenderObject>
				{/if}
			{:else}
				<div class="flex flex-grow items-center p-4">
					<p class="text-center text-zinc-400 dark:text-zinc-600">No data found</p>
				</div>
			{/if}
		{/if}
	{/each}
</section>
