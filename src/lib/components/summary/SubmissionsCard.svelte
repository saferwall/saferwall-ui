<script lang="ts">
	import type { Submission } from '$lib/types/summary';
	import { timestampToFormattedDate } from '$lib/utils/date';
	import BaseCard from '../BaseCard.svelte';
	import ButtonShowAll from '../form/ButtonShowAll.svelte';

	const maxRecords = 10;

	export let submissions: Submission[];

	$: expanded = false;
	$: activeExpanding = submissions.length > maxRecords;
</script>

<BaseCard>
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
				{#each submissions as submission}
					<tr>
						<td><time>{timestampToFormattedDate(submission.timestamp * 1000)}</time></td>
						<td>{submission.filename}</td>
						<td class="capitalize">{submission.src}</td>
						<td>{submission.country}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if activeExpanding}
			<ButtonShowAll on:mouseup={() => (expanded = !expanded)} {expanded} />
		{/if}
	</div>
</BaseCard>

<style lang="scss">
	.card__list {
		.hide {
			@apply hidden;
		}
	}
</style>
