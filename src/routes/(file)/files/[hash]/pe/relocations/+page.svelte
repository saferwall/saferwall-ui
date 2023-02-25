<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { translateGroupValue, valueToHex } from '$lib/utils/format';
	import type { PageData } from './$types';

	const maxRecords = 20;
	export let data: PageData;

	// TODO: split into components

	$: groups = data.relocations;

	let entries: Record<number, boolean> = {};

	$: isEntryOpen = (index: number) => {
		return entries[index] == true;
	};
</script>

<article>
	<h1 class="title">Relocations</h1>

	<table class="groups">
		<thead>
			<th class="w-2">#</th>
			<td class="w-2" />
			<th>Entry RVA</th>
			<th>Size of Block</th>
			<th>Items Count</th>
		</thead>
		<tbody>
			{#each groups as group, index}
				<tr
					class="box"
					on:mouseup={() => (entries[index] = !isEntryOpen(index))}
					class:expanded={isEntryOpen(index)}
				>
					<td class="px-0 !pr-0"
						><Icon
							size="w-4 h-4"
							class={'transition-all ' + (isEntryOpen(index) === true ? '' : '-rotate-90')}
							name="arrow-down"
						/></td
					>
					<td>{index}</td>
					<td>{translateGroupValue(group.Data.VirtualAddress, 'Relocations', 'VirtualAddress')}</td>
					<td>{translateGroupValue(group.Data.SizeOfBlock, 'Relocations', 'SizeOfBlock')}</td>
					<td>{group.Entries.length}</td>
				</tr>
				{#if isEntryOpen(index)}
					<tr class="box__body" class:hidden={!isEntryOpen(index)}>
						<td colspan="5">
							<div class="px-4 relative pt-0">
								<h2
									class="text-lg before:border-2 before:mr-2 before:border-primary text-primary font-semibold"
								>
									Entries
								</h2>
								<table class="items">
									<thead>
										<th>Offset</th>
										<th>Data</th>
										<th>Type</th>
										<th>Type Value</th>
									</thead>
									<tbody class="table-cval">
										{#each group.Entries as entry}
											<tr>
												<td>{entry.Offset}</td>
												<td>{valueToHex(entry.Data)}</td>
												<td>{valueToHex(entry.Type)}</td>
												<td>{translateGroupValue(entry.Type, 'Relocations', 'Type')}</td>
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
					@apply content-[''] absolute -top-2 rounded-t-none left-0 border rounded w-full h-full border-grayx-200 border-t-0;
				}

				&.box:after {
					@apply content-[''] absolute top-0 left-0 border rounded w-full h-full border-grayx-200;
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
