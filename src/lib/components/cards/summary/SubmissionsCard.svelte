<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { timestampToFormattedDate } from '$lib/utils';
	import { countryNames } from '$lib/utils/contryNames';
	import Card from '../../Card.svelte';
	import ButtonShowMore from '../../form/ButtonShowMore.svelte';
	import "/node_modules/flag-icons/css/flag-icons.min.css";

	const maxRecords = 10;
	export let submissions: Saferwall.Submission[] = [];

	$: expanded = false;
	$: activeExpanding = submissions.length > maxRecords;

	const onShowMoreMouseUp = () => {
		expanded = !expanded;
	};
</script>

<Card class="rounded-lg">
	<h1 class="card__title">Submissions</h1>
	<div class="flex flex-col">
		<table class="card__table [table-layout:fixed] w-full">
			<colgroup>
				<col span="1" class="w-[180px]">
				<col span="1" class="min-w-[25%]">
				<col span="1" class="w-[max(100px,35%)]">
				<col span="1" class="w-[150px]">
			 </colgroup>
			<thead>
				<th class="font-semibold">Published</th>
				<th class="font-semibold">Name</th>
				<th class="font-semibold">Source</th>
				<th class="font-semibold">Country</th>
			</thead>
			<tbody class="[&_td]:whitespace-nowrap">
				{#each submissions as submission, i}
					<tr class:hide={!expanded && i > maxRecords}>
						<td class="max-w-fit"><time>{timestampToFormattedDate(submission.timestamp)}</time></td>
						<td class="text-ellipsis whitespace-nowrap overflow-hidden break-all">
								{submission.filename}
						</td>
						<td class="capitalize">{submission.src}</td>
						<td class="max-w-fit">
							<div class="flex gap-2">
								{#if submission.country && typeof submission.country === "string"}
									<span class="fi fi-{submission.country.toLowerCase()} flex-shrink-0"></span>
									<span class="text-ellipsis overflow-hidden">{countryNames[submission.country.toLowerCase()]}</span>
								{:else}
									<span>N/A</span>
								{/if}
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if activeExpanding}
			<ButtonShowMore on:click={onShowMoreMouseUp} {expanded} />
		{/if}
	</div>
</Card>
