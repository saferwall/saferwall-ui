<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { translateGroupValue, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	$: groups = data.boundImport;

	let entries: Record<number, boolean> = {};

	$: isEntryOpen = (index: number) => {
		return entries[index] == true;
	};
</script>

<article>
	<h1 class="title">Bound imports</h1>
	<table class="groups">
		<thead>
			<th>#</th>
			<th>Name</th>
			<th>Time Date Stamp</th>
			<th>Offset Module Name</th>
			<th>Number Of Module Forwarder Refs</th>
		</thead>
		<tbody>
			{#each groups as group, index}
				<tr
					class="box"
					on:click={() => (entries[index] = !isEntryOpen(index))}
					class:expanded={isEntryOpen(index)}
				>
					<td class="px-0 pl-4 !pr-0">
						<Icon
							size="w-4 h-4"
							name="arrow-down"
							class={'transition-all ' + (isEntryOpen(index) === true ? '' : '-rotate-90')}
						/>
					</td>
					<td>{translateGroupValue(group.name, 'imports', 'name')}</td>
					<td>{translateGroupValue(group.struct?.time_date_stamp, '', 'time_date_stamp')}</td>
					<td>{valueToHex(group.struct?.offset_module_name)}</td>
					<td>{group.struct?.number_of_module_forwarder_refs}</td>
				</tr>
				{#if isEntryOpen(index)}
					<tr class="box__body" class:hidden={!isEntryOpen(index)}>
						<td colspan="8">
							<div class="p-4 relative pt-0">
								<h2
									class="text-lg before:border-2 before:mr-2 before:border-primary text-primary font-semibold"
								>
									Functions
								</h2>
								<table class="items w-full">
									<thead>
										<th>Name</th>
										<th>Time Date Stamp</th>
										<th>Offset Module Name</th>
										<th>Reserved</th>
									</thead>
									<tbody>
										{#if group.forwarded_refs}
											{#each group.forwarded_refs as entry}
												<tr>
													<td>{entry.name}</td>
													<td>{valueToHex(entry.struct.offset_module_name)}</td>
													<td>{valueToHex(entry.struct.time_date_stamp)}</td>
													<td>{valueToHex(entry.struct.reserved)}</td>
												</tr>
											{/each}
										{/if}
									</tbody>
								</table>
							</div>
						</td>
					</tr>
				{/if}
			{/each}
			
		</tbody>
	</table>
</article>

<style lang="postcss">
	table.groups {
		@apply pr-4 border-separate border-spacing-y-2 w-full;

		thead th {
			@apply font-bold;
		}

		tbody {
			tr {
				@apply relative z-0;

				&.box__body:after {
					@apply content-[''] absolute -z-10 -top-2 rounded-t-none left-0 border rounded w-full h-full border-neutral-500 border-t-0;
				}

				&.box:after {
					@apply content-[''] absolute -z-10 top-0 left-0 border rounded w-full h-full border-neutral-500;
				}

				&.expanded:after {
					@apply rounded-b-none border-b-0;
				}

				td {
					@apply p-4 py-2;
				}
			}
		}
	}

	table.items {
		@apply w-full;

		tbody tr {
			@apply even:bg-zinc-100 even:dark:bg-zinc-800;
			@apply odd:bg-zinc-200 odd:dark:bg-zinc-700;
			
			td {
				/* @apply py-2 w-1/4; */
				@apply first:rounded-l last:rounded-r;
				/* @apply py-2 w-1/4; */
			}
		}
	}
</style>
