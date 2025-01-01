<script lang="ts">
	import Multitoggle from '$lib/components/Multitoggle.svelte';
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import { Saferwall } from '$lib/types';
	import type { PageData } from './$types';
	import CodeView from './tabs/CodeView.svelte';
	import ExDllChar from './tabs/ExDllChar.svelte';
	import Fpo from './tabs/Fpo.svelte';
	import Pogo from './tabs/Pogo.svelte';
	import Repro from './tabs/Repro.svelte';
	import VcFeature from './tabs/VcFeature.svelte';

	export let data: PageData;

	let tabs: {
		label: string;
		value: Saferwall.Debug.Type;
		component: any;
		checked?: boolean;
		data: any;
	}[] = [
		{
			label: 'CODE VIEW',
			value: Saferwall.Debug.Type.CODE_VIEW,
			component: CodeView
		},
		{
			label: 'POGO',
			value: Saferwall.Debug.Type.POGO,
			component: Pogo
		},
		{
			label: 'REPRO',
			value: Saferwall.Debug.Type.REPRO,
			component: Repro
		},
		{
			label: 'EX. DLL CHAR',
			value: Saferwall.Debug.Type.EX_DLL_CHAR,
			component: ExDllChar
		},
		{
			label: 'VC FEATURE',
			value: Saferwall.Debug.Type.VC_FEATURE,
			component: VcFeature
		},
		{
			label: 'FPO',
			value: Saferwall.Debug.Type.FPO,
			component: Fpo
		}
	]
		.map((c) => ({
			...c,
			data: data.debug.find((i) => i.struct.type === c.value)!
		}))
		.filter((v) => v.data)
		.map((v, index) => ({ ...v, checked: index === 0 }));

	$: activeTab = tabs.find((v) => v.checked)!;
	$: currentTabStruct = Object.entries(activeTab?.data?.struct ?? {});
	$: borderTop =
		[Saferwall.Debug.Type.FPO, Saferwall.Debug.Type.POGO].includes(activeTab?.value) === false;
</script>

<section class="flex flex-col gap-4 pr-4">
	<h1 class="title">Debugs</h1>
	<div>
		<Multitoggle bind:items={tabs} border />
	</div>

	<div class="flex flex-col gap-6">
		<TableKeyValue header={false} items={currentTabStruct} />
		<div class={borderTop ? 'pt-4 border-t border-zinc-300 dark:border-zinc-700' : ''}>
			{#each tabs as tab}
				{#if tab.checked}
					<svelte:component this={tab.component} data={tab.data} />
				{/if}
			{/each}
		</div>
	</div>
</section>
