<script lang="ts">
	import type { PageData } from './$types';
	import AntivirusScanCard from '$lib/components/cards/antivirus/AntivirusScanCard.svelte';

	export let data: PageData;

	$: multiav = data.antivirus.multiav;
	$: firstScan = multiav.first_scan;
	$: lastScan = multiav.first_scan;

	$: equalScans = !Object.keys(firstScan).find((keyName) => {
		const resultA: any = firstScan[keyName];
		const resultB: any = firstScan[keyName];

		const equalResults = Object.keys(resultA).find(
			(subKey: string) => resultA[subKey] !== resultB[subKey]
		);

		return equalResults;
	});
</script>

<div class="container mx-auto pb-20">
	<div class="flex space-y-12 md:space-y-0 md:flex-row md:space-x-10">
		<AntivirusScanCard sortBy="first" title="First Scan" result={firstScan} />
		{#if !equalScans}
			<AntivirusScanCard sortBy="last" title="Last scan" result={lastScan} />
		{/if}
	</div>
</div>
