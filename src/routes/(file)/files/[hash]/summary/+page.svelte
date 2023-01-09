<script lang="ts">
	import type { PageData } from './$types';
	import BasePropsCard from '$lib/components/summary/BasePropsCard.svelte';
	import FileSummaryCard from '$lib/components/summary/FileSummaryCard.svelte';

	export let data: PageData;

	$: summary = data.summary;

	$: summaryCard = {
		score: summary.multiav,
		signature: summary.signature,
		fileType: summary.file_format,
		lastScanned: summary.last_scanned,
		firstSubmission: summary.first_seen
	};

	$: properties = summary.properties;

	console.log(data);
</script>

<section class="container mx-auto py-2 space-y-6">
	<FileSummaryCard {...summaryCard} />
	<BasePropsCard {properties} />
</section>
