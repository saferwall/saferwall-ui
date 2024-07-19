<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import DateTime from '$lib/components/DateTime.svelte';
	import Card from '../../Card.svelte';
	import AntivirusResult from './AntivirusResult.svelte';

	export let result: Saferwall.Scan;

	export let date: number;
	export let title = 'Scan Results';
</script>

<Card class="w-full {$$props.class}">
	<div class="space-y-2">
		<h2>{title}</h2>
		<p class="text-neutral-500">
			<DateTime {date} />
		</p>
	</div>
	<div class="border-t border-neutral-100" />
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
</Card>
