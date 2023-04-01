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
	<div
		class="flex md:space-y-0 md:flex-row md:space-x-10  max-md:bg-white max-md:rounded-xl max-md:shadow-base max-md:p-6"
	>
		<AntivirusScanCard
			sortBy="first"
			title="First Scan"
			result={firstScan}
			class="max-md:rounded-none max-md:shadow-none max-md:p-0"
		/>
		<AntivirusScanCard
			sortBy="last"
			title="Last scan"
			result={lastScan}
			class="max-md:rounded-none max-md:shadow-none max-md:p-0"
		/>
	</div>
</div>
