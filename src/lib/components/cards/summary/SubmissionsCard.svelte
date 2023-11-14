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
				<th>Published</th>
				<th>Name</th>
				<th>Source</th>
				<th>Country</th>
			</thead>
			<tbody>
				{#each submissions as submission, i}
					<tr class:hide={!expanded && i > maxRecords}>
						<td><time>{timestampToFormattedDate(submission.timestamp * 1000)}</time></td>
						<td>{submission.filename}</td>
						<td class="capitalize">{submission.src}</td>
						<td>{submission.country}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if activeExpanding}
			<ButtonShowMore on:mouseup={onShowMoreMouseUp} {expanded} />
		{/if}
	</div>
</Card>
