<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { translateGroupValue, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	const maxRecords = 20;
	export let data: PageData;

	$: groups = data.imports;

	let entries: Record<number, boolean> = {};

	$: isEntryOpen = (index: number) => {
		return entries[index] == true;
	};
</script>

<article class="boxes">
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
					<td class="!pr-0">
						<Icon
							size="w-4 h-4"
							name="arrow-down"
							class={'transition-all ' + (isEntryOpen(index) === true ? '' : '-rotate-90')}
						/>
					</td>
					<td>{translateGroupValue(group.name, 'imports', 'name')}</td>
					<td>{valueToHex(group.descriptor.name)}</td>
					<td>{valueToHex(group.offset)}</td>
					<td>{valueToHex(group.descriptor.first_thunk)}</td>
					<td
						>{translateGroupValue(
							group.descriptor.time_date_stamp,
							'imports',
							'time_date_stamp'
						)}</td
					>
					<td
						>{translateGroupValue(
							group.descriptor.forwarder_chain,
							'imports',
							'forwarder_chain'
						)}</td
					>
					<td>{group.functions.length}</td>
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
										{#each group.functions as entry}
											<tr>
												<td>{entry.name}</td>
												<td>{valueToHex(entry.thunk_rva)}</td>
												<td>{valueToHex(entry.thunk_value)}</td>
												<td>{valueToHex(entry.original_thunk_rva)}</td>
												<td>{valueToHex(entry.original_thunk_value)}</td>
												<td>{valueToHex(entry.hint)}</td>
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
