<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { translateKeyToTitle, translateGroupValue, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	const recordsPerPage = 200;
	let records = recordsPerPage;

	export let data: PageData;
	$: exceptions = data.exceptions?.map((exception) => {
		return {
			base: exception.runtime_function,
			unwind: Object.entries(exception.unwin_info)
				.filter(([key]) => !['function_entry', 'unwind_codes'].includes(key))
				.map(([key, value]) => {
					return {
						key: translateKeyToTitle(key),
						value: translateGroupValue(value, 'exceptions', key)
					};
				}),
			codes: (exception.unwin_info.unwind_codes || []).map(
				(code: { unwind_op: string; operand: string }) => {
					return {
						...code,
						value: [
							translateGroupValue(code.unwind_op, 'exceptions', 'unwind_op'),
							code.operand
						].join(' , ')
					};
				}
			)
		};
	});

	let entries: Record<number, boolean> = {};

	$: expanded = exceptions.length <= records;
	$: isEntryOpen = (index: number) => {
		return entries[index] == true;
	};

	$: paginationTrigger = () => {
		if (exceptions.length <= records) {
			records = recordsPerPage;
		} else {
			records += recordsPerPage;
		}
	};
</script>

<article>
	<h1 class="title">Exceptions</h1>
	<table class="exceptions">
		<thead>
			<th colspan="2">Begin Address</th>
			<th>End Address</th>
			<th>Unwind Info Address</th>
		</thead>
		<tbody>
			{#each exceptions.slice(0, records) as item, index}
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
					<td>{valueToHex(item.base.begin_address)}</td>
					<td>{valueToHex(item.base.end_address)}</td>
					<td>{valueToHex(item.base.unwind_info_address)}</td>
				</tr>
				{#if isEntryOpen(index)}
					<tr class="box__body" class:hidden={!isEntryOpen(index)}>
						<td colspan="8">
							<div class="p-4 relative">
								<h2
									class="text-lg before:border-2 before:mr-2 before:border-primary text-primary font-semibold"
								>
									Unwind Info
								</h2>
								<table class="w-full">
									<tbody>
										{#each item.unwind as entry}
											<tr>
												<td class="lg:w-1/4 font-semibold">{entry.key}</td>
												<td>{entry.value}</td>
											</tr>
										{/each}
										{#if item.codes && item.codes.length > 0}
											<tr>
												<td colspan="2">
													<div class="flex flex-col w-full">
														<h4 class="font-bold">Unwind codes</h4>
														<div class="pl-5 pt-4">
															<ul class="border-l border-gray-100 pl-5 py-2">
																{#each item.codes as code}
																	<li class="text-xs">
																		<span class="font-semibold"
																			>{valueToHex(code.code_offset)} :</span
																		>
																		<span>{code.value}</span>
																	</li>
																{/each}
															</ul>
														</div>
													</div>
												</td>
											</tr>
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

	<ButtonShowMore mode="more" bind:expanded on:mouseup={() => paginationTrigger()} />
</article>

<style lang="postcss">
	table.exceptions {
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

				&.expanded:nth-child(2n + 1):after {
					@apply rounded-b-none border-b-0;
				}

				&.box td {
					@apply p-4 rounded;
				}

				&.box__body {
					td {
						@apply px-4 py-1.5;
					}
				}
			}
		}
	}
</style>
