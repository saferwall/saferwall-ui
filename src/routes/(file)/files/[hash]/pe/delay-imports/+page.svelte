<script lang="ts">
	import type { PageData } from './$types';

	import Icon from '$lib/components/Icon.svelte';
	import { translateGroupValue, valueToHex } from '$lib/utils';

	export let data: PageData;
	$: groups = data.delayImport ?? [];

	let entries: Record<number, boolean> = {};
	$: isEntryOpen = (index: number) => {
		return entries[index] == true;
	};
</script>

<article>
	<h1 class="title">Delay imports</h1>
	<table class="groups">
		<thead>
			<th colspan="2">Name</th>
			<th>Module Handle</th>
			<th>IAT</th>
			<th>INT</th>
			<th>Bound IAT</th>
			<th>Unload IAT</th>
			<th>Time Date Stamp</th>
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
					<td>{translateGroupValue(group.Name, 'DelayImports', 'Name')}</td>
					<td>{valueToHex(group.Descriptor.ModuleHandleRVA)}</td>
					<td>{valueToHex(group.Descriptor.ImportAddressTableRVA)}</td>
					<td>{valueToHex(group.Descriptor.ImportNameTableRVA)}</td>
					<td>{valueToHex(group.Descriptor.BoundImportAddressTableRVA)}</td>
					<td>{valueToHex(group.Descriptor.UnloadInformationTableRVA)}</td>
					<td
						>{translateGroupValue(
							group.Descriptor.TimeDateStamp,
							'DelayImports',
							'TimeDateStamp'
						)}</td
					>
				</tr>
				{#if group.Functions && isEntryOpen(index)}
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
										<th>Original Thunk TVA</th>
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
					@apply content-[''] absolute -z-10 -top-2 rounded-t-none left-0 border rounded w-full h-full border-neutral-200 border-t-0;
				}

				&.box:after {
					@apply content-[''] absolute -z-10 top-0 left-0 border rounded w-full h-full border-neutral-200;
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
