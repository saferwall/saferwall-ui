<script lang="ts">
	import CircularProgessBar from '$lib/components/CircularProgessBar.svelte';
import FileTypeIcon from '$lib/components/FileTypeIcon.svelte';
	import type { Saferwall } from '$lib/types';
	import { timeSince } from '$lib/utils';
	import Card from '../../Card.svelte';

	export let score: Saferwall.Multiav = {
		count: 0,
		value: 0
	};

	export let lastScanned: number;
	export let firstSubmission: number;
	export let signature: string | undefined = undefined;
	export let fileExtension: string | undefined = undefined;

	$: signatureColor = signature?.includes('not')
		? 'text-alert-red'
		: signature?.includes('invalid')
			? 'text-alert-orange'
			: 'text-alert-green';
	$: signatureFill = signature?.includes('not')
		? 'fill-alert-red'
		: signature?.includes('invalid')
			? 'fill-alert-orange'
			: 'fill-alert-green';
	$: signatureStroke = signature?.includes('not')
		? 'stroke-alert-red'
		: signature?.includes('invalid')
			? 'stroke-alert-orange'
			: 'stroke-alert-green';
	$: lastScannedSince = timeSince(lastScanned);
	$: firstSubmissionSince = timeSince(firstSubmission);
</script>

<Card
	flex={false}
	padding={false}
	class="summary flex lg:justify-between flex-wrap lg:flex-nowrap lg:items-center rounded w-full lg:p-4 divide-x divide-line-surface"
>
	<article class="summary__card flex-grow">
		<h2 class="sr-only">Analyse score</h2>
		<div class="flex items-center space-x-6">
			<CircularProgessBar score={score?.value} total={score?.count}
				textClass="font-medium"
				circleClass="stroke-none"
				scoreClass="text-md leading-[1] {signatureFill}"
				progressCircleClass="{signatureStroke}"
				totalClass="fill-secondary-text"
				trackCircleClass="stroke-line-surface"
			></CircularProgessBar>
			<p class="font-semibold {signatureColor}">
				{#if score.value === 0}
					No antivirus venders flagged <br />this file as malicious
				{:else}
					{score.value} antivirus venders flagged<br /> this file as malicious
				{/if}
			</p>
		</div>
	</article>
	{#if signature}
		<article class="summary__card flex-grow lg:flex-grow-0">
			<h2 class="summary__card__title">Signature</h2>
			<p class="summary__card__desc {signatureColor}">{signature}</p>
		</article>
	{/if}
	<article class="summary__card flex-grow lg:flex-grow-0">
		<h2 class="summary__card__title">Last scanned</h2>
		<p class="summary__card__desc"><time datetime="2023-01-01 12:00">{lastScannedSince}</time></p>
	</article>
	<article class="summary__card flex-grow lg:flex-grow-0">
		<h2 class="summary__card__title">First submission</h2>
		<p class="summary__card__desc">
			<time datetime="2023-01-01 12:00">{firstSubmissionSince}</time>
		</p>
	</article>
	<!-- //todo: File type icons -->
	{#if fileExtension}
		<article class="summary__card short flex-grow lg:flex-grow-0">
			<h2 class="sr-only">File type</h2>
			<p>
				<span class="sr-only">{fileExtension}</span>
				<FileTypeIcon name={fileExtension} />
			</p>
		</article>
	{/if}
</Card>

<style lang="postcss">
	.summary {
		&__card {
			@apply p-6 lg:px-4 lg:py-0 w-1/2 md:w-auto text-xs;

			@apply flex flex-col justify-center;

			&:first-child {
				@apply lg:border-none w-full md:w-auto p-6;
			}

			&:last-child {
				@apply w-fit;
			}

			&__title {
				@apply font-medium text-neutral-400 uppercase;
			}

			&__desc {
				@apply font-medium;
			}

			&.short {
				@apply px-8;
			}
		}
	}
</style>
