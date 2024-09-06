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
	<div>
		<h2 class="font-semibold text-lg text-primary-text">{title}</h2>
		<p class="text-secondary-text">
			<DateTime {date} />
		</p>
	</div>
	<table class="card__list table-fixed">
		{#each Object.entries(result) as [key, item]}
		<tr class="card__item">
			<th class="card__item__title capitalize font-normal">{key}</th>
			<td class="card__item__content md:px-0 text-nowrap">
				<AntivirusResult {...item} />
			</td>
		</tr>
		{/each}
		<colgroup>
			<col span="1" class="w-[50%]">
			<col span="1" class="w-[50%]">
		 </colgroup>
	</table>
</Card>
