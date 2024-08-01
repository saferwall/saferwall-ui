<script lang="ts">
	import type { PageData } from './$types';

	import Icon from '$lib/components/Icon.svelte';
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Table from '$lib/components/table';
	import { cn, translateGroupValue, valueToHex } from '$lib/utils';

	export let data: PageData;
	$: groups = data.delayImport ?? [];

	let entries: Record<number, boolean> = {};
	$: isEntryOpen = (index: number) => {
		return entries[index] == true;
	};

	$: onClickEntryOpen = (index: number) => {
		entries[index] = !entries[index];
	};

	const maxRecords = 20;
	$: expanded = false;
	const onClickExpand = () => {
		expanded = !expanded;
	};
</script>

<article class="boxes">
	<h1 class="title">Delay imports</h1>
	<Table.Root class="groups">
		<Table.Header>
			<Table.Col colspan="2">Name</Table.Col>
			<Table.Col>Module Handle</Table.Col>
			<Table.Col>IAT</Table.Col>
			<Table.Col>INT</Table.Col>
			<Table.Col>Bound IAT</Table.Col>
			<Table.Col>Unload IAT</Table.Col>
			<Table.Col>Time Date Stamp</Table.Col>
		</Table.Header>
		<Table.Body>
			{#each groups as group, index}
				{#if index < maxRecords || expanded}
					<Table.Row
						class={cn('box', isEntryOpen(index) && 'expanded')}
						on:click={() => onClickEntryOpen(index)}
					>
						<Table.Val class="pr-0">
							<Icon
								size="w-4 h-4"
								name="arrow-down"
								class={'transition-all ' + (isEntryOpen(index) === true ? '' : '-rotate-90')}
							/>
						</Table.Val>
						<Table.Val>{translateGroupValue(group.name, 'delay_imports', 'name')}</Table.Val>
						<Table.Val>{valueToHex(group.descriptor.module_handle_rva)}</Table.Val>
						<Table.Val>{valueToHex(group.descriptor.import_address_table_rva)}</Table.Val>
						<Table.Val>{valueToHex(group.descriptor.import_name_table_rva)}</Table.Val>
						<Table.Val>{valueToHex(group.descriptor.bound_import_address_table_rva)}</Table.Val>
						<Table.Val>{valueToHex(group.descriptor.unload_information_table_rva)}</Table.Val>
						<Table.Val>
							{translateGroupValue(
								group.descriptor.time_date_stamp,
								'delay_imports',
								'time_date_stamp'
							)}
						</Table.Val>
					</Table.Row>
					{#if group.functions && isEntryOpen(index)}
						<Table.Row class={cn('box__body', !isEntryOpen(index) && 'hidden')}>
							<Table.Val colspan="8">
								<div class="p-4 relative pt-0">
									<h2
										class="text-lg before:border-2 before:mr-2 before:border-primary text-primary font-semibold"
									>
										Functions
									</h2>
									<Table.Root class="items">
										<Table.Header>
											<Table.Col>Name</Table.Col>
											<Table.Col>Trunk RVA</Table.Col>
											<Table.Col>Trunk Value</Table.Col>
											<Table.Col>Original Trunk TVA</Table.Col>
											<Table.Col>Original Trunk Value</Table.Col>
											<Table.Col>Hint</Table.Col>
										</Table.Header>
										<Table.Body>
											{#each group.functions as entry}
												<Table.Row>
													<Table.Val>{entry.name}</Table.Val>
													<Table.Val>{valueToHex(entry.thunk_rva)}</Table.Val>
													<Table.Val>{valueToHex(entry.thunk_value)}</Table.Val>
													<Table.Val>{valueToHex(entry.original_thunk_rva)}</Table.Val>
													<Table.Val>{valueToHex(entry.original_thunk_value)}</Table.Val>
													<Table.Val>{valueToHex(entry.hint)}</Table.Val>
												</Table.Row>
											{/each}
										</Table.Body>
									</Table.Root>
								</div>
							</Table.Val>
						</Table.Row>
					{/if}
				{/if}
			{/each}

			{#if groups.length >= maxRecords}
				<Table.Row>
					<Table.Val colspan="8">
						<ButtonShowMore bind:expanded on:click={onClickExpand} />
					</Table.Val>
				</Table.Row>
			{/if}
		</Table.Body>
	</Table.Root>
</article>
