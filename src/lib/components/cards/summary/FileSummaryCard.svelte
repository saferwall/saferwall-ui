<script lang="ts">
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

	$: scoreColor =
		score.value == 0
			? 'text-green'
			: score.value! / (score.count || 1) > 0.5
				? 'text-red'
				: 'text-orange';
	$: signatureColor = signature?.includes('not')
		? 'text-red'
		: signature?.includes('invalid')
			? 'text-orange'
			: 'text-green';

	$: lastScannedSince = timeSince(lastScanned);
	$: firstSubmissionSince = timeSince(firstSubmission);
</script>

<Card
	flex={false}
	padding={false}
	class="summary flex lg:justify-between flex-wrap lg:flex-nowrap lg:items-center rounded w-full lg:p-4"
>
	<article class="summary__card flex-grow">
		<h2 class="sr-only">Analyse score</h2>
		<div class="flex items-center space-x-6">
			<div class="rounded-full font-bold text-lg bg-gray-200 p-1.5">
				<div class="flex flex-center flex-col w-24 h-24 rounded-full bg-white">
					<span class="text-3xl {scoreColor}">{score?.value ?? 'N/A'}</span>
					<span class="text-gray-300">/ {score?.count ?? '-'}</span>
				</div>
			</div>
			<p class="font-semibold {scoreColor}">
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

<style lang="scss">
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
