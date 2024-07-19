<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import Overlay from '$lib/components/Overlay.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Select from '$lib/components/form/Select.svelte';
	import type { Pagination, Saferwall } from '$lib/types';
	import { cleanUndefinedKeyValue, timestampToFormattedDate } from '$lib/utils';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import ApiTraceRow from './components/ApiTraceRow.svelte';
	import FiltersDrawer from './components/FilterDrawer.svelte';

	export let data: PageData;

	const propertiesItems = [
		{ id: 'pid', name: 'PID' },
		{ id: 'tid', name: 'TID' },
		{ id: 'args', name: 'Arguments' },
		{ id: 'api', name: 'API' },
		{ id: 'ret', name: 'Return' }
	];

	let form: HTMLFormElement;

	$: getProcName = (pid: string) => filters.find((f) => f.pid == pid)?.proc_name!;

	$: search = data.search;
	$: pids = (data.filters.pids || []).filter(Boolean);
	$: hiddenProps = (data.hiddenProps || []).filter(Boolean);

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
						? generateQueryParams({
								...formParams,
								page: pageNumber,
								hprops: hiddenProps
						  })
						: undefined
			};
		})
		.filter((p) => totalPages > 0);

	$: perPages = [5, 10, 20, 40, 50, 100, 300].filter(
		(page, index) => index < 1 || page <= totalCount
	);

	$: hash = data.hash;
	$: session = data.session;
	$: currentPage = data.pagination.page;
	$: perPage = data.pagination.per_page;
	$: totalPages = data.pagination.page_count;
	$: totalCount = data.pagination.total_count;
	$: behaviorId = data.behaviorId!;
	$: filters = [] as Saferwall.Behaviors.ProcessTree;

	$: w32apis = {} as Record<string, string[]>;
	$: rows = updateRows(data.pagination.items, w32apis);

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
			hprops: updateHiddenProps
		};
	};

	$: formParams = (currentPage || hiddenProps || form) && getFormParams();

	const handleFormChanges = () => {
		goto(
			generateQueryParams({
				...getFormParams()
			}),
			{ replaceState: true, noScroll: true }
		);
	};

	const onFiltersChanges = ({ detail }: { detail: string[] }) => {
		pids = [...detail];
		handleFormChanges();
	};

	const onRowToggleMouseUp = (index: number, trace: any) => {
		const row = rows[index];

		if (!row.values) {
			row.values = w32apis[row.name]!.map(([type, name], argIndex) => ({
				type,
				name,
				value: row.args[argIndex]
			})) as any as Saferwall.Behaviors.ApiTrace.Entry[];
		}
	};

	const updateRows = (
		rows: Saferwall.Behaviors.ApiTrace.Item[],
		w32apis: Record<string, string[]>
	) => {
		return rows?.map((row) => {
			if (!row.values && w32apis?.[row.name]) {
				row.values = w32apis[row.name]!.map(([type, name], argIndex) => ({
					type,
					name,
					value: row.args[argIndex]
				})) as any as Saferwall.Behaviors.ApiTrace.Entry[];
				row._args = row.values
					.map((e) => `${e.name}:${e.value.val || e.value.in || e.value.out}`)
					.join(',');
			}
			return row;
		});
	};

	$: isActiveProperty = (id: string): boolean => !hiddenProps || !hiddenProps?.includes(id);

	$: displayProperties = false;
	const onPropsToggleAction = () => (displayProperties = !displayProperties);

	$: filterDrawer = false;
	const onOpenDrawMouseUp = () => {
		filterDrawer = true;
	};

	onMount(() => {
		fetch('/data/w32apis-ui.json', { cache: 'force-cache' })
			.then((res) => res.json())
			.then((res) => (w32apis = res));
	});
</script>

<div class="container mx-auto flex flex-col flex-1">
	<div
		data-sveltekit-preload-data
		class="flex-1 bg-white text-gray-700 rounded overflow-auto p-6 gap-4"
	>
		<form
			data-sveltekit-keepfocus
			bind:this={form}
			on:change={handleFormChanges}
			class="flex items-center justify-center space-x-4"
		>
			<Input name="search" icon="search" bind:search placeholder="Search anything..." />
			<div class="flex-shrink-0 flex-grow text-gray-600">
				<Button
					on:click={onOpenDrawMouseUp}
					icon="filter"
					class={pids.length > 0 ? 'border-primary' : ''}
				>
					<span class="px-2 py-0.5"> Process filter </span>

					{#if pids.length > 0}
						<span
							class="flex items-center justify-center rounded-full w-6 h-6 bg-primary text-white text-sm"
						>
							{pids.length}
						</span>
					{/if}
				</Button>
			</div>
			<div class="properties relative flex-shrink-0 flex-grow text-gray-600">
				<Button icon="properties" on:click={onPropsToggleAction} on:keyup={onPropsToggleAction}>
					<span class="px-2 py-0.5">Properties</span>
				</Button>
				{#if displayProperties}
					<Overlay on:mouseup={onPropsToggleAction}>
						<ul class="absolute top-[120%] left-0 w-52 shadow z-50 bg-white rounded-lg p-4">
							<li class="flex flex-row items-center justify-between pb-2">
								<span class="text-sm text-neutral-500 font-semibold">Show table</span>
								<button
									autofocus
									on:keyup={(e) => (e.key === 'Escape' ? onPropsToggleAction() : null)}
									on:click={onPropsToggleAction}
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
		<div class="flex flex-1 h-full">
			<table class="w-full flex-shrink-0 rows h-full">
				<thead class="rows__thead">
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
					{#each rows as trace, index}
						<tr
							class="box"
							on:mouseup={() => {
								trace._open = !trace._open;

								onRowToggleMouseUp(index, trace);
							}}
							class:expanded={trace._open}
						>
							<td class="pl-4">
								<Icon
									size="w-4 h-4"
									name="arrow-down"
									class={'transition-all ' + (trace._open === true ? '' : '-rotate-90')}
								/>
							</td>
							<td>{timestampToFormattedDate(trace.ts)}</td>
							{#if isActiveProperty('pid')}
								<td>{trace.pid}</td>
							{/if}
							{#if isActiveProperty('tid')}
								<td>{trace.tid}</td>
							{/if}
							{#if isActiveProperty('api')}
								<td>{trace.name}</td>
							{/if}
							{#if isActiveProperty('args')}
								<td class="max-w-xs">
									<p class="truncate text-xs">
										{trace._args || 'NaN'}
									</p>
								</td>
							{/if}
							{#if isActiveProperty('ret')}
								<td>{trace.ret}</td>
							{/if}
						</tr>
						{#if trace._open}
							<tr class="box__body" class:hidden={!trace._open}>
								<td colspan="8" class="overflow-hidden">
									<div transition:slide={{ axis: 'y', duration: 200 }}>
										<ApiTraceRow
											{trace}
											{session}
											{hash}
											{behaviorId}
											procName={getProcName(rows[index].pid)}
											pid={rows[index].pid}
											tid={rows[index].tid}
										/>
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

<FiltersDrawer
	{pids}
	{session}
	{behaviorId}
	open={filterDrawer}
	on:filters={(event) => {
		filters = [...(event.detail ?? [])];
	}}
	on:change={onFiltersChanges}
	on:close={() => (filterDrawer = false)}
/>

<style lang="postcss">
	table.rows {
		@apply pr-4 border-separate border-spacing-y-2 w-full;

		thead th {
			@apply cursor-pointer;
			@apply font-medium text-gray-400 py-3 text-left flex-row;
		}

		thead.rows__thead > th {
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

	.properties {
		input[type='checkbox']:checked ~ label {
			@apply bg-primary  bg-opacity-20;
		}
	}
</style>
