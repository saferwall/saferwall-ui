<script lang="ts">
	import type { PageData } from './$types';
	import AntivirusScanCard from '$lib/components/cards/antivirus/AntivirusScanCard.svelte';

	export let data: PageData;

	$: firstScan = multiav.first_scan!;
	$: first_scan = data.antivirus.first_seen;

	$: lastScan = multiav.last_scan!;
	$: last_scan = data.antivirus.last_scanned;

	$: multiav = data.antivirus.multiav;
</script>

<div class="container mx-auto pb-20">
	<div
		class="flex md:space-y-0 md:flex-row md:space-x-10 max-md:bg-white max-md:rounded-xl max-md:p-6"
	>
		<AntivirusScanCard
			title="First Scan"
			result={firstScan}
			date={first_scan}
			class="max-md:rounded-none max-md:p-0"
		/>
		<AntivirusScanCard
			title="Last scan"
			result={lastScan}
			date={last_scan}
			class="max-md:rounded-none max-md:p-0"
		/>
	</div>
</div>
