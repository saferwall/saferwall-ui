<script lang="ts">
	import { translateKeyToTitle, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	$: dosHeaders = Object.entries(data.dosHeader).map(([key, value]) => {
		return {
			key: translateKeyToTitle(key),
			value: ['string', 'number'].includes(typeof value) ? valueToHex(value) : value,
			comment: ''
		};
	});
</script>

<article>
	<h1 class="title">Dos Header</h1>
	<table class="w-full">
		<thead>
			<th class="lg:w-1/4">Member</th>
			<th class="lg:w-1/4">Value</th>
			<th class="lg:w-1/2">Comment</th>
		</thead>
		<tbody>
			{#each dosHeaders as item}
				<tr>
					<td>{item.key}</td>
					<td>{item.value}</td>
					<td>{item.comment}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</article>
