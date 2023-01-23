<script lang="ts">
	import type { Scan, ScanResult } from '$lib/types/antivirus';
	import BaseCard from '../BaseCard.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import AntivirusResult from './AntivirusResult.svelte';

	export let result: Scan;

	export let title = 'Scan Results';
	export let sortBy: 'first' | 'last';

	$: sortedResults = Object.values(result).sort(
		(resultA, resultB) => resultA.update - resultB.update
	);

	$: dateScan = sortBy === 'last' ? sortedResults[0] : sortedResults[sortedResults.length - 1];
</script>

<BaseCard class="w-full">
	<div class="space-y-2">
		<h2>{title}</h2>
		<p class="text-grayx-500">
			<DateTime date={dateScan.update} />
		</p>
	</div>
	<div class="border-t border-grayx-100" />
	<table class="card__list">
		{#each Object.entries(result) as [key, item]}
			<tr class="card__item">
				<th class="card__item__title capitalize font-normal">{key}</th>
				<td class="card__item__content">
					<AntivirusResult {...item} />
				</td>
			</tr>
		{/each}
	</table>
</BaseCard>
