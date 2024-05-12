<script lang="ts">
	import { SaferwallClient } from '$lib/clients/saferwall';
	import BasePropsCard from '$lib/components/cards/summary/BasicPropsCard.svelte';
	import ExifFileMetadataCard from '$lib/components/cards/summary/ExifFileMetadataCard.svelte';
	import FileSummaryCard from '$lib/components/cards/summary/FileSummaryCard.svelte';
	import IndicatorsCard from '$lib/components/cards/summary/IndicatorsCard.svelte';
	import SubmissionsCard from '$lib/components/cards/summary/SubmissionsCard.svelte';
	import VirtualScreensCard from '$lib/components/cards/summary/VirtualScreensCard.svelte';
	import { indicators } from '$lib/data/demo';
	import { onMount } from 'svelte';
	import type { Saferwall } from '$lib/types';
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
	$: hash = summary.sha256;
	$: behaviorId = summary.default_behavior_id;
	$: properties = summary.properties;
	$: submissions = summary.submissions;
	$: screenshots = [] as Saferwall.Screenshots;

	onMount(() => {
		let saferwall = new SaferwallClient();
		if (behaviorId) {
			saferwall.getBahviorScreenshots(hash, behaviorId).then((images) => (screenshots = images));
		}
	});
</script>

<section class="container mx-auto space-y-6">
	<FileSummaryCard {...summaryCard} />
	<BasePropsCard {properties} />
	{#if exif}
		<ExifFileMetadataCard {exif} />
	{/if}
	<SubmissionsCard {submissions} />
	<IndicatorsCard {indicators} />
	{#if behaviorId && screenshots.length > 0}
		<VirtualScreensCard {screenshots} />
	{/if}
</section>
