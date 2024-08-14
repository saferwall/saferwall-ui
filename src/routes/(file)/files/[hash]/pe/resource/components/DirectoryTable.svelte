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

<Card class="bg-neutral-50 border border-zinc-300 dark:border-zinc-700" padding={false}>
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
		@apply  overflow-hidden;
		@apply border border-zinc-300 dark:border-zinc-700 border-collapse rounded text-xs;

		tbody td,
		thead th {
			@apply py-2 px-6 border bg-transparent border-zinc-300 dark:border-zinc-700;
		}

		th:last-child,
		td:last-child {
			/* @apply bg-white; */
		}

		tbody td {
			/* @apply bg-neutral-50; */
		}
	}
</style>
