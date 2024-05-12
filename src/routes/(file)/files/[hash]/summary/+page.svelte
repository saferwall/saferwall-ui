<script lang="ts">
	import BasePropsCard from '$lib/components/cards/summary/BasicPropsCard.svelte';
	import ExifFileMetadataCard from '$lib/components/cards/summary/ExifFileMetadataCard.svelte';
	import FileSummaryCard from '$lib/components/cards/summary/FileSummaryCard.svelte';
	import IndicatorsCard from '$lib/components/cards/summary/IndicatorsCard.svelte';
	import SubmissionsCard from '$lib/components/cards/summary/SubmissionsCard.svelte';
	import VirtualScreensCard from '$lib/components/cards/summary/VirtualScreensCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: summary = data.summary;

	$: summaryCard = {
		score: summary.multiav,
		signature: summary.signature,
		fileExtension: summary.file_extension,
		lastScanned: summary.last_scanned,
		firstSubmission: summary.first_seen
	};

	$: exif = summary.exif;
	$: properties = summary.properties;
	$: submissions = summary.submissions;
	$: behavior = summary.default_behavior_report;
	$: screenshots = behavior?.screenshots;
	$: indicators = behavior?.capabilities;
</script>

<section class="container mx-auto space-y-6">
	<FileSummaryCard {...summaryCard} />
	<BasePropsCard {properties} />
	{#if exif}
		<ExifFileMetadataCard {exif} />
	{/if}
	<SubmissionsCard {submissions} />
	{#if behavior}
		{#if indicators && indicators.length > 0}
			<IndicatorsCard {indicators} />
		{/if}
		{#if screenshots && screenshots.length > 0}
			<VirtualScreensCard {screenshots} />
		{/if}
	{/if}
</section>
