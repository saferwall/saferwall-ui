<script lang="ts">
	import type { PageData } from './$types';
	import AntivirusScanCard from '$lib/components/cards/antivirus/AntivirusScanCard.svelte';

	export let data: PageData;

	$: multiav = data.antivirus.multiav;
	$: firstScan = multiav.first_scan;
	$: lastScan = multiav.first_scan;

	// TODO: find out if the first scan & last are same
</script>

<div class="container mx-auto pb-20">
	<div class="flex space-y-12 md:space-y-0 md:flex-row md:space-x-10">
		<AntivirusScanCard sortBy="first" title="First Scan" result={firstScan} />
		<AntivirusScanCard sortBy="last" title="Last scan" result={lastScan} />
	</div>
</div>
