<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { Saferwall } from '$lib/types';
	import { translateGroupValue } from '$lib/utils';

	export let struct: Saferwall.Resource.Struct;

	$: rows = Object.entries(struct).map(([name, value]) => {
		return {
			member: name,
			value: value
		};
	});
</script>

<Card class="bg-neutral-50 border border-gray-200" padding={false}>
	<table>
		<thead>
			<th>Member</th>
			<th>Value</th>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					<td>{row.member}</td>
					<td>{translateGroupValue(row.value, 'resources', row.member)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Card>

<style lang="postcss">
	table {
		@apply bg-neutral-50 overflow-hidden;
		@apply border border-collapse rounded text-xs;

		tbody td,
		thead th {
			@apply py-3 px-6 border bg-white;
		}

		th:last-child,
		td:last-child {
			@apply bg-white;
		}

		tbody td {
			@apply bg-neutral-50;
		}
	}
</style>
