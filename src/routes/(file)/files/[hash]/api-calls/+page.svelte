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
	import { cubicInOut, cubicOut } from 'svelte/easing';

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
	$: client = data.client;
	$: currentPage = data.pagination.page;
	$: perPage = data.pagination.per_page;
	$: perPageString = perPage.toString();
	let awaiting = false;
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
		fetch("/api/w32api", { cache: "force-cache" })
			.then((res) => res.json())
			.then((res) => (w32apis = res));
	});
</script>

<div class="container mx-auto flex flex-col flex-1">
	<div
		data-sveltekit-preload-data
		class="flex-1 bg-secondary-surface text-primary-text rounded overflow-auto p-6 gap-4"
	>
		<form
			data-sveltekit-keepfocus
			bind:this={form}
			on:change={handleFormChanges}
			class="flex items-center justify-center space-x-4 text-gray-500"
		>
			<Input name="search" icon="search" class="border-primary-border text-primary-text placeholder:text-searchbar-text" bind:search placeholder="Search anything..." />
			<div class="flex-shrink-0 flex-grow ">
				<Button
					on:click={onOpenDrawMouseUp}
					icon="tune"
					class="border-primary-border {pids.length > 0 ? '' : ''}"
				>
					<span class="px-2 py-0.5 text-primary-text">Process filter</span>

					{#if pids.length > 0}
						<span
							class="flex items-center justify-center rounded-full w-6 h-6 bg-primary text-white text-xs"
						>
							{pids.length}
						</span>
					{/if}
				</Button>
			</div>
			<div class="properties relative flex-shrink-0 flex-grow">
				<Button icon="checklist" class="border-primary-border" on:click={onPropsToggleAction} on:keyup={onPropsToggleAction}>
					<span class="px-2 py-0.5 text-primary-text">Properties</span>
				</Button>
				{#if displayProperties}
					<Overlay on:click={onPropsToggleAction}>
						<ul class="absolute top-[120%] left-0 w-52 z-50 bg-white rounded-lg p-4">
							<li class="flex flex-row items-center justify-between pb-2">
								<span class="text-xs text-neutral-500 font-semibold">Show table</span>
								<!-- svelte-ignore a11y-autofocus -->
								<button
									autofocus
									on:keyup={(e) => (e.key === 'Escape' ? onPropsToggleAction() : null)}
									on:click={onPropsToggleAction}
									type="button"
									class="text-xs bg-neutral-50 rounded-full border border-primary-border p-1"
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
									<label for={property.id} class="py-0.5 text-xs px-2 text-primary font-semibold">
										Hide
									</label>
								</li>
							{/each}
						</ul>
					</Overlay>
				{/if}
			</div>
		</form>
		<div class="flex flex-1 h-full">
			<table class="w-full flex-shrink-0 rows h-full">
				<thead class="rows__thead font-semibold">
					<th>
						<center class="pl-4 w-full flex items-center font-bold">
							<center class="size-5">#</center>
						</center>
					</th>
					<th><div class="th">TIME</div></th>
					{#if isActiveProperty('pid')}
						<th><div class="th">PID</div></th>
					{/if}
					{#if isActiveProperty('tid')}
						<th><div class="th">TID</div></th>
					{/if}
					{#if isActiveProperty('api')}
						<th><div class="th">API</div></th>
					{/if}
					{#if isActiveProperty('args')}
						<th><div class="th">ARGUMENTS</div></th>
					{/if}
					{#if isActiveProperty('ret')}
						<th><div class="th">RETURN</div></th>
					{/if}
				</thead>
				<tbody>
					{#each rows as trace, index}
						<tr
							class="box"
							on:click={() => {
								trace._open = !trace._open;

								onRowToggleMouseUp(index, trace);
							}}
							class:expanded={trace._open}
						>
							<td class="pl-4 w-min">
								<p class="flex h-full w-min">
									<span class="min-h-[1lh] flex items-center justify-center rounded-full !size-5 {trace._open === true ? "bg-brand-surface" : "bg-transparent"}">
										<Icon
											size="size-2.5"
											name="arrow-down"
											class="transition-all {trace._open === true ? "text-white translate-y-[1px]" : "-rotate-90  text-brand-surface"}"
										/>
									</span>
								</p>
							</td>
							<td>
								<p class="flex flex-col gap-4 h-full relative">
									<span class="h-[1lh] flex items-center">
										{timestampToFormattedDate(trace.ts)}
									</span>
									{#if trace._open}
										<div transition:slide={{ axis: 'y', duration: 150, easing: cubicOut }} class="w-0">
											<ApiTraceRow
												{trace}
												{client}
												{hash}
												{behaviorId}
												procName={getProcName(rows[index].pid)}
												pid={rows[index].pid}
												tid={rows[index].tid}
											/>
										</div>
									{/if}
								</p>
							</td>
							{#if isActiveProperty('pid')}
								<td>
									<p class="flex h-full">
										<span class="h-[1lh] flex items-center">{trace.pid}</span>
									</p>
								</td>
							{/if}
							{#if isActiveProperty('tid')}
								<td>
									<p class="flex h-full">
										<span class="h-[1lh] flex items-center">{trace.tid}</span>
									</p>
								</td>
							{/if}
							{#if isActiveProperty('api')}
								<td>
									<p class="flex h-full">
										<span class="h-[1lh] flex items-center">{trace.name}</span>
									</p>
								</td>
							{/if}
							{#if isActiveProperty('args')}
								<td class="truncate max-w-xs ">
									{trace._args || 'NaN'}
									<!-- <p class="h-full truncate text-xs max-w-xs">
										<span class="h-[1lh] flex items-center">
											{trace._args || 'NaN'}
										</span>
									</p> -->
								</td>
							{/if}
							{#if isActiveProperty('ret')}
								<td>
									<p class="flex h-full">
										<span class="h-[1lh] flex items-center">{trace.ret}</span>
									</p>
								</td>
							{/if}
						</tr>
					{/each}
					<tr>
						<td class="border-0" colspan="8">
							<form class="flex justify-between --pt-[30px] max-w-full">
								<div class="[&_>_label]:h-full">
									<Select name="per_page" class="py-[7px] px-[10px] pr-[5px] pl-[3px] bg-secondary-surface border border-secondary-border text-secondary-text rounded-sm" bind:value={perPageString}>
										{#each perPages as count}
											<option selected={count == perPage}>{count.toString()}</option>
										{/each}
									</Select>
								</div>
								<ul class="flex gap-2 flex-shrink-0 min-w-max">
									{#each pagesButtons as page}
										<li>
											<Button
												class="{currentPage === page.number
													?
														"text-white bg-brand-surface"
													:
														`border border-secondary-border text-secondary-text
														hover:text-brand-text hover:bg-brand-CF-surface hover:border-transparent
														active:text-white active:bg-brand-surface`
												} rounded-sm h-full {page.number < 10 ? "aspect-square" : "px-[10px]"}"
												on:click={() => { currentPage = page.number }}
												loading={currentPage === page.number && awaiting}
											>
												{page.number}
											</Button>
										</li>
									{/each}
								</ul>
							</form>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- <div class="flex justify-center">
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
		</div> -->
	</div>
</div>

<FiltersDrawer
	{pids}
	{client}
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
		@apply pr-4 border-separate border-spacing-y-[13px] w-full;

		thead th {
			@apply cursor-pointer;
			@apply font-medium text-tertiary-text pt-[30px] text-left flex-row;
			.th {
				@apply font-semibold;
				&:after {
					content: '◀   ▶';
					@apply transform rotate-90 scale-y-[50%] scale-x-[40%] -translate-x-2 inline-block w-max h-max text-xs px-1 font-black;
				}
			}
		}
		
		thead.rows__thead > th {
			.th {
			}
		}

		tbody {
			tr {
				@apply relative z-0 whitespace-nowrap;

				td {
					@apply align-baseline;
					@apply border border-primary-border border-r-0 border-l-0;
					&:first-child {
						@apply border-l rounded-l;
					}
					&:last-child {
						@apply border-r rounded-r;
					}
				}
				@apply tracking-wide;

				@apply bg-transparent transition-colors;
				&.expanded {
					@apply font-medium tracking-[0.015em];
					@apply bg-apc-surface;
				}

				td {
					@apply cursor-pointer;
					@apply py-4 pr-1;
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
