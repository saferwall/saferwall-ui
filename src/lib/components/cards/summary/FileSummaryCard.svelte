<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { getFileTypeIcon, timeSince } from '$lib/utils';
	import Card from '../../Card.svelte';

	export let score: Saferwall.Multiav = {
		count: 0,
		value: 0
	};

	export let lastScanned: number;
	export let firstSubmission: number;
	export let signature: string | undefined = undefined;
	export let fileType: string | undefined = undefined;

	$: scoreColor =
		score.value == 0
			? 'text-greenx'
			: score.value! / (score.count || 1) > 0.5
			? 'text-redx'
			: 'text-orangex';
	$: signatureColor = signature?.includes('not')
		? 'text-redx'
		: signature?.includes('invalid')
		? 'text-orangex'
		: 'text-greenx';

	$: lastScannedSince = timeSince(lastScanned * 1000);
	$: firstSubmissionSince = timeSince(firstSubmission * 1000);
</script>

<Card
	flex={false}
	padding={false}
	class="summary flex lg:justify-between flex-wrap lg:flex-nowrap lg:items-center bg-white rounded w-full shadow-base lg:p-4"
>
	<article class="summary__card flex-grow">
		<h2 class="sr-only">Analyse score</h2>
		<div class="flex items-center space-x-6">
			<div class="rounded-full font-bold text-lg bg-gray-200 p-1.5">
				<div class="flex flex-center flex-col w-24 h-24 rounded-full bg-white">
					<span class="text-3xl {scoreColor}">{score.value}</span>
					<span class="text-neutral-300">/ {score.count}</span>
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
	{#if false}
		<!-- //todo: File type icons -->
		<article class="summary__card short flex-grow lg:flex-grow-0">
			<h2 class="sr-only">File type</h2>
			<p>
				<span class="sr-only">{fileType}</span>
				<svg class="w-14 h-14"
					><use href="/images/icons.svg#icon-{getFileTypeIcon(fileType)}" /></svg
				>
			</p>
		</article>
	{/if}
</Card>

<style lang="scss">
	.summary {
		&__card {
			@apply p-6 lg:px-4 lg:py-0 w-1/2 md:w-auto;

			@apply flex flex-col border border-neutral-50 justify-center;
			@apply lg:border-t-0 lg:border-b-0 lg:border-r-0;

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
				@apply font-semibold text-base;
			}

			&.short {
				@apply px-8;
			}
		}
	}
</style>
