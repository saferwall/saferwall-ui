<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { timestampToFormattedDate } from '$lib/utils';
	import Card from '../../Card.svelte';
	import ButtonShowMore from '../../form/ButtonShowMore.svelte';

	const maxRecords = 10;
	export let submissions: Saferwall.Submission[] = [];

	$: expanded = false;
	$: activeExpanding = submissions.length > maxRecords;

	const onShowMoreMouseUp = () => {
		expanded = !expanded;
	};
</script>

<Card>
	<h1 class="card__title">Submissions</h1>
	<div class="flex flex-col">
		<table class="card__table">
			<thead>
				<th class="font-semibold">Published</th>
				<th class="font-semibold">Name</th>
				<th class="font-semibold">Source</th>
				<th class="font-semibold">Country</th>
			</thead>
			<tbody>
				{#each submissions as submission, i}
					<tr class:hide={!expanded && i > maxRecords}>
						<td><time>{timestampToFormattedDate(submission.timestamp)}</time></td>
						<td>{submission.filename}</td>
						<td class="capitalize">{submission.src}</td>
						<td>{submission.country}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if activeExpanding}
			<ButtonShowMore on:click={onShowMoreMouseUp} {expanded} />
		{/if}
	</div>
</Card>
