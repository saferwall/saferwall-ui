<script lang="ts">
	import type { PageData } from './$types';
	import FileSummaryCard from '$lib/components/FileSummaryCard.svelte';

	export let data: PageData;

	$: summary = data.summary;

	$: summaryCard = {
		score: summary.multiav,
		signature: summary.signature,
		fileType: summary.file_format,
		lastScanned: summary.last_scanned,
		firstSubmission: summary.first_seen
	};
</script>

<section class="container mx-auto py-2">
	<FileSummaryCard {...summaryCard} />
</section>
