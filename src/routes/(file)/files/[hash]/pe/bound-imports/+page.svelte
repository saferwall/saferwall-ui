<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { translateGroupValue, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	const maxRecords = 20;
	export let data: PageData;

	// TODO: split into components

	$: groups = data.items;

	let entries: Record<number, boolean> = {};

	$: isEntryOpen = (index: number) => {
		return entries[index] == true;
	};
</script>

<article>
	<h1 class="title">Bound imports</h1>
	<table class="groups">
		<thead>
			<th>Name</th>
			<th>Module Forwarder Refs</th>
			<th>Time Date Stamp</th>
			<th>Offset Module Name</th>
			<th>Number Of Module Forwarder Refs</th>
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
					<td>{translateGroupValue(group.Struct.TimeDateStamp, '', 'TimeDateStamp')}</td>
					<td>{valueToHex(group.Struct.OffsetModuleName)}</td>
					<td>{group.Struct.NumberOfModuleForwarderRefs}</td>
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
										<th>Time Date Stamp</th>
										<th>Offset Module Name</th>
										<th>Reserved</th>
									</thead>
									<tbody>
										{#if group.ForwardedRefs}
											{#each group.ForwardedRefs as entry}
												<tr>
													<td>{entry.Name}</td>
													<td>{valueToHex(entry.Struct.OffsetModuleName)}</td>
													<td>{valueToHex(entry.Struct.TimeDateStamp)}</td>
													<td>{valueToHex(entry.Struct.Reserved)}</td>
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
