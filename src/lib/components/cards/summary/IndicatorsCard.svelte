<script lang="ts">
	import Label from '$lib/components/form/Label.svelte';
	import type { Saferwall } from '$lib/types';
	import Card from '../../Card.svelte';
	import ButtonShowMore from '../../form/ButtonShowMore.svelte';

	const maxRecords = 10;

	export let indicators: Saferwall.Behaviors.DefaultReport['capabilities'] = [];

	$: expanded = false;
	$: activeExpanding = indicators.length > maxRecords;
</script>

<Card class="rounded-lg">
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
							<div class="flex gap-2 items-center {
								{
									high: "text-alert-red",
									suspicious: "text-alert-orange",
									informative: "text-brand-text"
								}[indicator.severity] || "text-brand-text"}">
								<svg class="size-4">
									<use href="/images/icons.svg#{
										{
											high: "icon-unsafe",
											suspicious: "icon-target",
											informative: "icon-info"
										}[indicator.severity] || "icon-info"
									}" />
								</svg>
								<span class="capitalize">
									{indicator.severity}
								</span>
							</div>
						</td>
						<td class="capitalize">{indicator.category}</td>
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
