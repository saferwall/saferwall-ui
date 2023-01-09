<script lang="ts">
	import type { PageData } from './$types';
	import BasePropsCard from '$lib/components/summary/BasicPropsCard.svelte';
	import FileSummaryCard from '$lib/components/summary/FileSummaryCard.svelte';
	import ExifFileMetadataCard from '$lib/components/summary/ExifFileMetadataCard.svelte';

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
	$: exif = summary.exif;

	console.log(data);
</script>

<section class="container mx-auto pt-2 pb-12 space-y-6">
	<FileSummaryCard {...summaryCard} />
	<BasePropsCard {properties} />
	<ExifFileMetadataCard {exif} />
</section>
