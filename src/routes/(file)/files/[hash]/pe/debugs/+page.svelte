<script lang="ts">
	import Multitoggle from '$lib/components/Multitoggle.svelte';
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import { Saferwall } from '$lib/types';
	import type { PageData } from './$types';
	import CodeView from './tabs/CodeView.svelte';
	import ExDllChart from './tabs/ExDllChart.svelte';
	import Fpo from './tabs/Fpo.svelte';
	import Pogo from './tabs/Pogo.svelte';
	import Repro from './tabs/Repro.svelte';
	import VcFeature from './tabs/VcFeature.svelte';

	export let data: PageData;

	let toggleMenu = [
		{
			label: 'CODE VIEW',
			value: Saferwall.Debug.Type.CODE_VIEW
		},
		{
			label: 'POGO',
			value: Saferwall.Debug.Type.POGO
		},
		{
			label: 'REPRO',
			value: Saferwall.Debug.Type.REPRO
		},
		{
			label: 'EX. DLL CHAR',
			value: Saferwall.Debug.Type.EX_DLL_CHAR
		},
		{
			label: 'VC FEATURE',
			value: Saferwall.Debug.Type.VC_FEATURE
		},
		{
			label: 'FPO',
			value: Saferwall.Debug.Type.FPO
		}
	]
		.map((c) => ({
			...c,
			data: data.debug.find((i) => i.Struct.Type === c.value)
		}))
		.filter((v) => v.data)
		.map((v, index) => ({ ...v, checked: index === 0 }));

	$: currentActiveTab = toggleMenu.find((v) => v.checked)!;
	$: currentTabStruct = Object.entries(currentActiveTab?.data?.Struct ?? {});

	$: activeTabKey = currentActiveTab?.value!;
	$: activeTabData = currentActiveTab?.data! as Saferwall.Debug.Data<never, never>;
	$: borderTop =
		[Saferwall.Debug.Type.FPO, Saferwall.Debug.Type.POGO].includes(activeTabKey) === false;
</script>

<section class="flex flex-col gap-4 pr-4">
	<h1 class="title">Debugs</h1>
	<div>
		<Multitoggle bind:items={toggleMenu} border />
	</div>

	<div class="flex flex-col gap-6">
		<TableKeyValue header={false} items={currentTabStruct} />
		<div class={borderTop ? 'pt-4 border-t border-gray-100' : ''}>
			{#if activeTabKey === Saferwall.Debug.Type.CODE_VIEW}
				<CodeView item={activeTabData} />
			{:else if activeTabKey === Saferwall.Debug.Type.EX_DLL_CHAR}
				<ExDllChart item={activeTabData} />
			{:else if activeTabKey === Saferwall.Debug.Type.FPO}
				<Fpo item={activeTabData} />
			{:else if activeTabKey === Saferwall.Debug.Type.POGO}
				<Pogo item={activeTabData} />
			{:else if activeTabKey === Saferwall.Debug.Type.REPRO}
				<Repro item={activeTabData} />
			{:else if activeTabKey === Saferwall.Debug.Type.VC_FEATURE}
				<VcFeature item={activeTabData} />
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
</style>
