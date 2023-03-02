<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { translateGroupValue, valueToHex } from '$lib/utils/format';
	import type { PageData } from './$types';

	const maxRecords = 20;
	export let data: PageData;

	// TODO: split into components

	$: groups = data.imports;

	let entries: Record<number, boolean> = {};

	$: isEntryOpen = (index: number) => {
		return entries[index] == true;
	};
</script>

<article>
	<h1 class="title">Imports</h1>
	<table class="groups">
		<thead>
			<th class="w-2">#</th>
			<th>Name</th>
			<th>Name RVA</th>
			<th>OFT</th>
			<th>FT</th>
			<th>Time Stamp</th>
			<th>Forwarder Chain</th>
			<th>Count</th>
		</thead>
		<tbody>
			{#each groups as group, index}
				<tr
					class="box"
					on:mouseup={() => (entries[index] = !isEntryOpen(index))}
					class:expanded={isEntryOpen(index)}
				>
					<td class="px-0 !pr-0">
						<Icon
							size="w-4 h-4"
							name="arrow-down"
							class={'transition-all ' + (isEntryOpen(index) === true ? '' : '-rotate-90')}
						/>
					</td>
					<td>{translateGroupValue(group.Name, 'Imports', 'Name')}</td>
					<td>{valueToHex(group.Descriptor.Name)}</td>
					<td>{valueToHex(group.Offset)}</td>
					<td>{valueToHex(group.Descriptor.FirstThunk)}</td>
					<td>{translateGroupValue(group.Descriptor.TimeDateStamp, 'Imports', 'TimeDateStamp')}</td>
					<td
						>{translateGroupValue(group.Descriptor.ForwarderChain, 'Imports', 'ForwarderChain')}</td
					>
					<td>{group.Functions.length}</td>
				</tr>
				{#if isEntryOpen(index)}
					<tr class="box__body" class:hidden={!isEntryOpen(index)}>
						<td colspan="8">
							<div class="px-4 relative pt-0">
								<h2
									class="text-lg before:border-2 before:mr-2 before:border-primary text-primary font-semibold"
								>
									Functions
								</h2>
								<table class="items w-full">
									<thead>
										<th>Name</th>
										<th>Thunk RVA</th>
										<th>Thunk Value</th>
										<th>Original Thunk RVA</th>
										<th>Original Thunk Value</th>
										<th>Hint</th>
									</thead>
									<tbody>
										{#each group.Functions as entry}
											<tr>
												<td>{entry.Name}</td>
												<td>{valueToHex(entry.ThunkRVA)}</td>
												<td>{valueToHex(entry.ThunkValue)}</td>
												<td>{valueToHex(entry.OriginalThunkRVA)}</td>
												<td>{valueToHex(entry.OriginalThunkValue)}</td>
												<td>{valueToHex(entry.Hint)}</td>
											</tr>
										{/each}
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

<style lang="scss">
	table.groups {
		@apply pr-4 border-separate border-spacing-y-2 w-full;

		thead th {
			@apply font-bold;
		}

		tbody {
			tr {
				@apply relative z-0;

				&.box__body:after {
					@apply content-[''] absolute -z-10 -top-2 rounded-t-none left-0 border rounded w-full h-full border-grayx-200 border-t-0;
				}

				&.box:after {
					@apply content-[''] absolute -z-10 top-0 left-0 border rounded w-full h-full border-grayx-200;
				}

				&.expanded:nth-child(2n + 1):after {
					@apply rounded-b-none border-b-0;
				}

				td {
					@apply p-4 py-4 rounded;
				}
			}
		}
	}

	table.items {
		@apply w-full;

		tbody tr {
			@apply even:bg-gray-50;

			td {
				@apply py-2 w-1/4;
			}
		}
	}
</style>
