<script lang="ts">
	import { splitCamelCase, valueToHex } from '$lib/utils';
	import type { A } from 'vitest/dist/types-71ccd11d';

	export let lines = false;
	export let header = true;
	export let hexValue = true;
	export let camelCase = true;
	export let items: any[][] = [];
</script>

<table class="w-full">
	<tbody class:divide-y={lines} class:divide-neutral-100={lines}>
		{#if header}
			<tr>
				<td class="font-semibold text-base">Member</td>
				<td class="font-semibold text-base">Value</td>
			</tr>
		{/if}
		{#each items as [key, value]}
			<tr>
				<td>{camelCase ? splitCamelCase(key) : key}</td>
				<td>{hexValue ? valueToHex(value) : value}</td>
			</tr>
		{/each}
		<slot />
	</tbody>
</table>

<style lang="scss">
	table {
		@apply w-full;
		.divide-y {
			td {
				@apply px-4;
			}
		}

		tbody tr {
			td {
				@apply py-3;

				&:first-child {
					@apply lg:w-1/4 font-medium;
				}
			}
		}
	}
</style>
