<script lang="ts">
	import { splitCamelCase, valueToHex } from '$lib/utils/format';

	export let header = true;
	export let hexValue = true;
	export let camelCase = true;
	export let items: [string, any][] = [];
</script>

<table class="w-full">
	<tbody>
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
