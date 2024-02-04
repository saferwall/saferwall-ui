<script lang="ts">
	import Multitoggle from '$lib/components/Multitoggle.svelte';
	import type { Saferwall } from '$lib/types';
	import type { PageData } from './$types';
	import CFGIAT from './tabs/CFGIAT.svelte';
	import GFIDS from './tabs/GFIDS.svelte';
	import Struct from './tabs/Struct.svelte';

	export let data: PageData;

	const componentsClass: Record<keyof Saferwall.Pe.LoadConfig.Root, any> = {
		CFGIAT: CFGIAT,
		GFIDS: GFIDS,
		LoadCfgStruct: Struct,
		SEH: Struct,
		VolatileMetadata: Struct
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
		? Object.entries(loadConfig).map(([key, value], index) => {
				return {
					label: key,
					value: key,
					data: value,
					checked: index === 0,
					component: componentsClass?.[key as keyof typeof componentsClass]
				};
		  })
		: [];
</script>

<section class="flex flex-col gap-4 pr-4">
	<h1 class="title">Debugs</h1>
	<div>
		<Multitoggle bind:items={tabs} border />
	</div>

	<div class="flex flex-col gap-6">
		<div>
			{#each tabs as tab}
				{#if tab.checked}
					<svelte:component this={tab.component} data={tab.data} />
				{/if}
			{/each}
		</div>
	</div>
</section>
