<script lang="ts">
	import BaseCard from '$lib/components/cards/BaseCard.svelte';
	import type { Struct } from '$lib/types/resource';
	import { translateGroupValue } from '$lib/utils/format';

	export let Struct: Struct;

	$: rows = Object.entries(Struct).map(([name, value]) => {
		return {
			member: name,
			value: value
		};
	});
</script>

<BaseCard class="bg-grayx-50 shadow-lg border border-gray-200" padding={false}>
	<table>
		<thead>
			<th>Member</th>
			<th>Value</th>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					<td>{row.member}</td>
					<td>{translateGroupValue(row.value, 'Resources', row.member)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</BaseCard>

<style lang="scss">
	table {
		@apply bg-grayx-50 overflow-hidden;
		@apply border border-collapse rounded text-sm;

		tbody td,
		thead th {
			@apply py-3 px-6 border bg-white;
		}

		th:last-child,
		td:last-child {
			@apply bg-white;
		}

		tbody td {
			@apply bg-grayx-50;
		}
	}
</style>
