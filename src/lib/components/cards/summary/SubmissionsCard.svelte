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
		<table class="card__table">
			<thead>
				<th class="font-semibold">Published</th>
				<th class="font-semibold">Name</th>
				<th class="font-semibold">Source</th>
				<th class="font-semibold">Country</th>
			</thead>
			<tbody class="[&_td]:whitespace-nowrap">
				{#each submissions as submission, i}
					<tr class:hide={!expanded && i > maxRecords}>
						<td><time>{timestampToFormattedDate(submission.timestamp)}</time></td>
						<td>{submission.filename}</td>
						<td class="capitalize w-full">{submission.src}</td>
						<td>
							<div class="flex gap-2">
								<span class="fi fi-{submission.country.toLowerCase()}"></span>
								<span>{countryNames[submission.country.toLowerCase()]}</span>
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
