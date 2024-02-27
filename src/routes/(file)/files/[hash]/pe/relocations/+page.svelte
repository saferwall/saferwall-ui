<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Table from '$lib/components/table';
	import { cn, translateGroupValue, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	const maxRecords = 20;
	export let data: PageData;

	$: groups = data.relocations;

	let entries: Record<number, boolean> = {};

	$: isEntryOpen = (index: number) => {
		return entries[index];
	};

	$: onClickEntryOpen = (index: number) => {
		entries[index] = !entries[index];
	};

	$: expanded = false;
	const onClickExpand = () => {
		expanded = !expanded;
	};
</script>

<article class="boxes">
	<h1 class="title">Relocations</h1>
	<Table.Root class="groups">
		<Table.Header class="font-bold">
			<Table.Col class="w-2">#</Table.Col>
			<Table.Col class="w-2" />
			<Table.Col>Entry RVA</Table.Col>
			<Table.Col>Size of Block</Table.Col>
			<Table.Col>Items Count</Table.Col>
		</Table.Header>
		<Table.Body>
			{#each groups as group, index}
				{#if index < maxRecords || expanded}
					<Table.Row
						class={cn('box', isEntryOpen(index) && 'expanded')}
						on:click={() => onClickEntryOpen(index)}
					>
						<Table.Val class="!pr-0">
							<Icon
								size="w-4 h-4"
								class={cn('transition-all', !isEntryOpen(index) && '-rotate-90')}
								name="arrow-down"
							/>
						</Table.Val>
						<Table.Val>{index}</Table.Val>
						<Table.Val>
							{translateGroupValue(group.data.virtual_address, 'relocations', 'virtual_address')}
						</Table.Val>
						<Table.Val>
							{translateGroupValue(group.data.size_of_block, 'relocations', 'size_of_block')}
						</Table.Val>
						<Table.Val>{group.entries.length}</Table.Val>
					</Table.Row>
					{#if isEntryOpen(index)}
						<Table.Row class={cn('box__body', isEntryOpen(index) ? '' : 'hidden')}>
							<Table.Val colspan="5">
								<div class="px-4 relative pt-0">
									<h2
										class="text-lg before:border-2 before:mr-2 before:border-primary text-primary font-semibold"
									>
										Entries
									</h2>
									<Table.Root class="items" striped>
										<Table.Header>
											<Table.Col>Offset</Table.Col>
											<Table.Col>Data</Table.Col>
											<Table.Col>Type</Table.Col>
											<Table.Col>Type Value</Table.Col>
										</Table.Header>
										<Table.Body>
											{#each group.entries as entry, entryIndex}
												<Table.Row>
													<Table.Val>{entry.offset}</Table.Val>
													<Table.Val>{valueToHex(entry.data)}</Table.Val>
													<Table.Val>{valueToHex(entry.type)}</Table.Val>
													<Table.Val
														>{translateGroupValue(entry.type, 'relocations', 'type')}</Table.Val
													>
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
					<Table.Val colspan="5">
						<ButtonShowMore bind:expanded on:click={onClickExpand} />
					</Table.Val>
				</Table.Row>
			{/if}
		</Table.Body>
	</Table.Root>
</article>
