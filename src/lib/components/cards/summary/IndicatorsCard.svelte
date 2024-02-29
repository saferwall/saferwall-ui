<script lang="ts">
	import Card from '../../Card.svelte';
	import ButtonShowMore from '../../form/ButtonShowMore.svelte';
	import CommingSoon from '../../partials/ComingSoon.svelte';

	const maxRecords = 10;

	export let indicators: any[] = [];

	$: expanded = false;
	$: activeExpanding = indicators.length > maxRecords;
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
							<div class="indicator__label indicator__label--{indicator.severity}">
								{indicator.severity}
							</div>
						</td>
						<td>{indicator.category}</td>
						<td>{indicator.module}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<CommingSoon />
		{#if activeExpanding}
			<ButtonShowMore on:click={() => (expanded = !expanded)} {expanded} />
		{/if}
	</div>
</Card>

<style lang="scss">
	.indicator {
		&__label {
			@apply inline-flex py-2.5 px-5 rounded;
			@apply capitalize font-semibold;
			@apply bg-gray-300 text-gray-800;

			&--malicious {
				@apply bg-redx text-redx;
			}
			&--suspicious {
				@apply bg-orangex text-orangex;
			}
			&--informational {
				@apply bg-purplex text-purplex;
			}

			&--malicious,
			&--suspicious,
			&--informational {
				@apply bg-opacity-10;
			}
		}
	}
</style>
