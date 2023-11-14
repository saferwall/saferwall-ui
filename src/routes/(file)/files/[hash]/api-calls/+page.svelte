<script lang="ts">
	import type { Pagination } from '$lib/types';
	import type { PageData } from './$types';

	import { goto } from '$app/navigation';
	import { cleanUndefinedKeyValue, timestampToFormattedDate } from '$lib/utils';
	import { onMount } from 'svelte';

	import Icon from '$lib/components/Icon.svelte';
	import Overlay from '$lib/components/Overlay.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Select from '$lib/components/form/Select.svelte';
	import ApiTraceValue from './components/ApiTraceValue.svelte';

	export let data: PageData;

	const propertiesItems = [
		{ id: 'pid', name: 'PID' },
		{ id: 'tid', name: 'TID' },
		{ id: 'args', name: 'Arguments' },
		{ id: 'api', name: 'API' },
		{ id: 'ret', name: 'Return' }
	];

	let form: HTMLFormElement;
	let entries: Record<number, boolean> = {};

	let w32apis: Record<string, string[]> = {};
	$: pids = data.filters.pids || [];
	$: groups = data.pagination.items || [];
	$: hprops = data.hprops;

	$: isEntryOpen = (index: number) => entries[index] == true;

	$: pages = Array(5)
		.fill(0)
		.map((_val, index, list) => {
			const page = currentPage + (index - Math.floor(list.length / 2));
			if (page == currentPage || (page >= 1 && page <= totalPages)) {
				return page;
			}
			return;
		})
		.filter((page) => page !== undefined);

	$: pagesButtons = [1, ...pages, totalPages]
		.filter((page, index, array) => array.indexOf(page) === index)
		.map((pageNumber) => {
			return {
				number: pageNumber,
				href:
					typeof pageNumber === 'number'
						? generateQueryParams({ ...formParams, page: pageNumber, hprops })
						: undefined
			};
		});

	$: perPages = [5, 10, 20, 40, 50, 100, 300].filter((page) => page <= totalCount);

	$: currentPage = data.pagination.page;
	$: perPage = data.pagination.per_page;
	$: totalPages = data.pagination.page_count;
	$: totalCount = data.pagination.total_count;

	const generateQueryParams = (
		options: Pagination & {
			pids?: string[];
			search?: string;
			hprops?: string[];
		}
	) => {
		return (
			'?' +
			new URLSearchParams(cleanUndefinedKeyValue({ ...(options as Pagination<string>) })).toString()
		);
	};

	const getFormParams = () => {
		const formData = new FormData(form);
		const updateHiddenProps = formData?.getAll('hprops') as string[];

		return {
			pids,
			page: currentPage,
			per_page: parseInt(formData?.get('per_page') as string),
			search: formData?.get('search') as string,
			hprops: updateHiddenProps.length > 0 ? updateHiddenProps : hprops
		};
	};

	$: formParams = (currentPage || hprops || form) && getFormParams();

	const handleFormChanges = () => {
		goto(
			generateQueryParams({
				...getFormParams()
			}),
			{ replaceState: true, noScroll: true }
		);
	};

	const toggleEntry = (index: number) => {
		const entry = groups[index];

		const newStatus = !isEntryOpen(index);

		if (!entry.values) {
			entry.values = w32apis[entry.name]!.map(([type, name], argIndex) => ({
				type,
				name,
				value: entry.args[argIndex]
			}));

			console.log(entry.values);
		}

		entries[index] = newStatus;
	};

	$: isActiveProperty = (id: string): boolean => !hprops || !hprops?.includes(id);

	$: displayProperties = false;
	const toggleProperties = () => (displayProperties = !displayProperties);

	onMount(() => {
		fetch('/data/w32apis-ui.json')
			.then((res) => res.json())
			.then((res) => {
				w32apis = res;

				groups.forEach((_, index) => toggleEntry(index));
			});
	});
</script>

<div class="container mx-auto">
	<div
		data-sveltekit-preload-data
		class="flex flex-col bg-white text-gray-700 rounded overflow-auto w-full h-full p-6 space-y-6"
	>
		<form
			data-sveltekit-keepfocus
			bind:this={form}
			on:change={handleFormChanges}
			class="flex items-center justify-center space-x-4"
		>
			<Input name="search" icon="search" placeholder="Search anything..." />
			<div class="flex-shrink-0 flex-grow text-gray-600">
				<Button icon="filter">
					<span class="px-2 py-0.5">Process filter</span>
				</Button>
			</div>
			<div class="properties relative flex-shrink-0 flex-grow text-gray-600 ">
				<Button icon="properties" on:mouseup={toggleProperties}>
					<span class="px-2 py-0.5">Properties</span>
				</Button>
				{#if displayProperties}
					<Overlay on:mouseup={toggleProperties}>
						<ul class="absolute top-[120%] left-0 w-52 shadow z-50 bg-white rounded-lg p-4">
							<li class="flex flex-row items-center justify-between pb-2">
								<span class="text-sm text-neutral-500 font-semibold">Show table</span>
								<button
									type="button"
									class="text-xs bg-neutral-50 rounded-full border border-neutral p-1"
								>
									<Icon name="close" size="w-4 h-4" />
								</button>
							</li>
							{#each propertiesItems as property}
								<li class="px-2 py-1 flex flex-row justify-between">
									<input
										id={property.id}
										type="checkbox"
										class="hidden"
										name="hprops"
										checked={!isActiveProperty(property.id)}
										value={property.id}
									/>
									<span>{property.name}</span>
									<label for={property.id} class="py-0.5 text-sm px-2 text-primary font-semibold">
										Hide
									</label>
								</li>
							{/each}
						</ul>
					</Overlay>
				{/if}
			</div>
			<div class="flex-shrink-0 flex flex-row items-center space-x-2">
				<span class="text-gray-500 flex-shrink-0">Results per page</span>
				<Select name="per_page">
					{#each perPages as count}
						<option value={count} selected={perPage == count}>{count}</option>
					{/each}
				</Select>
			</div>
		</form>
		<div>
			<table class="w-full flex-shrink-0 groups">
				<thead class="groups__thead">
					<th colspan="2">TIME</th>
					{#if isActiveProperty('pid')}
						<th>PID</th>
					{/if}
					{#if isActiveProperty('tid')}
						<th>TID</th>
					{/if}
					{#if isActiveProperty('api')}
						<th>API</th>
					{/if}
					{#if isActiveProperty('args')}
						<th>ARGUMENTS</th>
					{/if}
					{#if isActiveProperty('ret')}
						<th>RETURN</th>
					{/if}
				</thead>
				<tbody>
					{#each groups as group, index}
						<tr
							class="box"
							on:mouseup={() => toggleEntry(index)}
							class:expanded={isEntryOpen(index)}
						>
							<td class="pl-4">
								<Icon
									size="w-4 h-4"
									name="arrow-down"
									class={'transition-all ' + (isEntryOpen(index) === true ? '' : '-rotate-90')}
								/>
							</td>
							<td>{timestampToFormattedDate(group.ts)}</td>
							{#if isActiveProperty('pid')}
								<td>{group.pid}</td>
							{/if}
							{#if isActiveProperty('tid')}
								<td>{group.tid}</td>
							{/if}
							{#if isActiveProperty('api')}
								<td>{group.name}</td>
							{/if}
							{#if isActiveProperty('args')}
								<td>
									<p class="truncate">
										{group.args?.map((a) => a?.value)?.filter((a) => a) || 'NaN'}
									</p>
								</td>
							{/if}
							{#if isActiveProperty('ret')}
								<td>{group.ret}</td>
							{/if}
						</tr>
						{#if isEntryOpen(index)}
							<tr class="box__body" class:hidden={!isEntryOpen(index)}>
								<td colspan="8" class="overflow-hidden">
									<div class="px-4 relative py-2 -mt-7 border-l">
										<table class="items w-full">
											<thead>
												<th>Type</th>
												<th>Name</th>
												<th class="w-full">Value</th>
											</thead>
											<tbody>
												{#each group?.values || [] as entry}
													<tr>
														<td>{entry.type}</td>
														<td>{entry.name}</td>
														<td class="w-full">
															<ApiTraceValue {entry} />
														</td>
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
		</div>
		<div class="flex justify-center">
			<ul class="flex space-x-2">
				{#each pagesButtons as page}
					<li>
						<Button
							data-sveltekit-noscroll=""
							class={currentPage === page.number ? 'active' : ''}
							href={page.href}
						>
							{page.number}
						</Button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="scss">
	table.groups {
		@apply pr-4 border-separate border-spacing-y-2 w-full;

		thead th {
			@apply cursor-pointer;
			@apply font-medium text-gray-400 py-3 text-left flex-row;
		}

		thead.groups__thead > th {
			&:after {
				content: '<>';
				@apply transform rotate-90 inline-block w-max h-max text-sm px-2 font-black;
			}
		}

		tbody {
			tr {
				@apply relative z-0 whitespace-nowrap;

				&.box__body:after {
					@apply content-[''] absolute -z-10 -top-2 rounded-t-none left-0 border rounded w-full h-full border-neutral-200 border-t-0;
				}

				&.expanded {
					@apply font-medium;
				}

				&.box:after {
					@apply content-[''] absolute -z-10 top-0 left-0 border rounded w-full h-full border-neutral-200;
				}

				&.expanded ~ .box__body:after {
					@apply shadow-xl shadow-neutral-100;
				}
				&.expanded:after {
					@apply rounded-b-none border-b-0;
				}

				td {
					@apply cursor-pointer;
					@apply py-4 rounded;
				}
			}
		}
	}

	table.items {
		@apply w-full ml-8;
		@apply border-l-2 border-neutral-200;

		tbody td,
		thead th {
			@apply md:pl-8;
		}

		tbody {
			tr {
				td {
					@apply w-1/4;
				}
			}
		}
	}

	.properties {
		input[type='checkbox']:checked ~ label {
			@apply bg-primary  bg-opacity-20;
		}
	}
</style>
