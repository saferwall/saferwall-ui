<script lang="ts">
	import Label from '$lib/components/form/Label.svelte';
	import type { Saferwall } from '$lib/types';
	import Card from '../../Card.svelte';
	import ButtonShowMore from '../../form/ButtonShowMore.svelte';

	const maxRecords = 10;

	export let indicators: Saferwall.Behaviors.DefaultReport['capabilities'] = [];

	$: expanded = false;
	$: activeExpanding = indicators.length > maxRecords;

	const getSeverityTheme = (value: string): Label['$$prop_def']['theme'] => {
		switch (value) {
			case 'high':
				return 'danger';
			case 'informative':
				return 'warning';

			default:
				return 'base';
		}
	};
</script>

<Card>
	<h1 class="card__title">Indicators</h1>
	<div class="flex flex-col relative overflow-hidden">
		<table class="card__table">
			<thead>
				<th>Description</th>
				<th>Severity</th>
				<th>Category</th>
				<th>Module</th>
			</thead>
			<tbody>
				{#each indicators as indicator, i}
					<tr class:hide={!expanded && i > maxRecords}>
						<td>{indicator.description}</td>
						<td>
							<Label theme={getSeverityTheme(indicator.severity)}>
								{indicator.severity}
							</Label>
						</td>
						<td>{indicator.category}</td>
						<td>{indicator.module}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if activeExpanding}
			<ButtonShowMore on:click={() => (expanded = !expanded)} {expanded} />
		{/if}
	</div>
</Card>
