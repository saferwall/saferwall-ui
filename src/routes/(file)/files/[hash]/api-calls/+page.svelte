<script lang="ts">
	import debounce from 'debounce';
	import { pushState } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import Overlay from '$lib/components/Overlay.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Select from '$lib/components/form/Select.svelte';
	import type { Pagination, Saferwall } from '$lib/types';
	import { cleanUndefinedKeyValue, timestampToFormattedDate } from '$lib/utils';
	import { onMount, tick } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import ApiTraceRow from './components/ApiTraceRow.svelte';
	import FiltersDrawer from './components/FilterDrawer.svelte';
	import { cubicOut } from 'svelte/easing';
	import PopUnder from '$lib/components/partials/PopUnder.svelte';
	import CheckBox from '$lib/components/form/CheckBox.v2.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	export let data: PageData;

	const propertiesItems = [
		{ id: 'pid', name: 'PID' } as const,
		{ id: 'tid', name: 'TID' } as const,
		{ id: 'name', name: 'API' } as const,
		{ id: '_args', name: 'Arguments', short: "Args." } as const,
		{ id: 'ret', name: 'Return' } as const,
	];

	$: getProcName = (pid: string) => filters.find((f) => f.pid == pid)?.proc_name!;

	let search = data.search || "";
	let pids = (data.filters.pids || []).filter(Boolean);
	let hiddenProps = (data.hiddenProps || []).filter(Boolean);
	let propertyItemHidden: {
		shown: boolean,
		name: string,
		short?: string | undefined,
		id: typeof propertiesItems[number]["id"]
	}[] = propertiesItems.map(item => ({ ...item, shown: !hiddenProps.includes(item.id) }));


	function convertPerPageStringToNumber(perPageString: string) {
		perPage = Number(perPageString);
	}

	function convertPerPageNumberToString(perPage: number) {
		perPageString = String(perPage);
	}

	$: convertPerPageStringToNumber(perPageString)
	$: convertPerPageNumberToString(perPage)

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
			};
		})
		.filter((p) => totalPages > 0);

	$: perPages = [5, 10, 20, 40, 50, 100, 300].filter(
		(page, index) => index < 1 || page <= totalCount
	);

	let pagination = data.pagination;

	let previousData = {
		currentPage: pagination.page,
		perPageString: pagination.per_page.toString(),
		propertyItemHidden,
		pids,
		search,
	}

	$: hash = data.hash;
	$: client = data.client;
	let currentPage = pagination.page;
	let perPage = pagination.per_page;
	let perPageString = perPage.toString();
	$: totalPages = pagination.page_count;
	$: totalCount = pagination.total_count;
	$: behaviorId = data.behaviorId!;
	$: filters = [] as Saferwall.Behaviors.ProcessTree;
	let awaiting = false;

	$: w32apis = {} as Record<string, string[]>;
	$: rows = updateRows(pagination.items, w32apis);

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

	let displayProperties = false;

	let filterDrawer = false;

	let mounted = false
	onMount(async () => {
		await tick();
		mounted = true;
		window.fetch("/api/w32api", { cache: "force-cache" })
			.then((res) => res.json())
			.then((res) => (w32apis = res));
	});

	type DataType = {
		currentPage: number;
		perPageString: string;
		propertyItemHidden: {
			shown: boolean;
			name: string;
			short?: string | undefined;
			id: "pid" | "tid" | "name" | "_args" | "ret";
		}[];
		pids: string[];
		search: string;
	};

	function detectChanges(data: DataType) {
		if (JSON.stringify(data) !== JSON.stringify(previousData)) {
			let newUrl = new URL($page.url);
			newUrl.searchParams.set("page", data.currentPage.toString());
			newUrl.searchParams.set("per_page", data.perPageString.toString());
			let hprops = data.propertyItemHidden.filter(el => !el.shown);
			if (hprops.length) {
				newUrl.searchParams.set("hprops", hprops.map(el => el.id).join(","));
			}
			if (data.pids.length) {
				newUrl.searchParams.set("pids", data.pids.join(","));
			}
			if (data.search !== "") {
				newUrl.searchParams.set("q", data.search);
			}
			pushState(newUrl.toString(), "");
			let reqParams: Record<string, number | string> = {};
			let changedCount = 0;
			if (data.pids.length)
				reqParams["pid"] = data.pids.join(",");
			if (JSON.stringify(data.pids) !== JSON.stringify(previousData.pids)) {
				changedCount++;
			}
			reqParams["page"] = data.currentPage.toString();
			if (data.currentPage !== previousData.currentPage) {
				changedCount++;
			}
			if (data.search !== "")
				reqParams["q"] = data.search;
			if (data.search !== previousData.search) {
				changedCount++;
				currentPage = 1;
				reqParams["page"] = 1;
			}
			reqParams["per_page"] = data.perPageString.toString();
			if (data.perPageString !== previousData.perPageString) {
				changedCount++;
				currentPage = 1;
				reqParams["page"] = 1;
			}

			if (changedCount) {
				debounced(reqParams);
			}
			previousData = structuredClone(data);
		}
	}
	
	let debounced = debounce((reqParams) => {
		awaiting = true;
		client.getFileApiTrace(behaviorId, reqParams).then((res) => {
			pagination = res;
		}).finally(() => awaiting = false);
	}, 200);


	$: {
		if (browser && mounted) {
			detectChanges({
				currentPage,
				perPageString,
				propertyItemHidden,
				pids,
				search
			});
		}
	}
</script>

<div class="container mx-auto flex flex-col flex-1">
	<div
		data-sveltekit-preload-data
		class="flex-1 bg-secondary-surface text-primary-text rounded overflow-auto p-6 gap-4"
	>
		<div class="flex items-center justify-center space-x-4">
			<div class="icon-color-wrapper text-gray-500 flex-grow">
				<Input name="search" icon={awaiting ? "loading": "search"} class="border-primary-border text-primary-text placeholder:text-searchbar-text" placeholder="Search anything..." bind:value={search} iconClass="{awaiting ? "animate-spin origin-center" : ""}"/>
			</div>
			<div class="flex-shrink-0">
				<Button
					on:click={() => filterDrawer = !filterDrawer}
					icon="tune"
					class="{pids.length ? "border-brand-border text-brand-text" : "border-primary-border text-primary-text"}"
					iconClass="size-5 {pids.length ? "text-brand-text" : "text-primary-icn"}"
				>
					<span class="px-2 py-0.5">Process filter</span>

					{#if pids.length}
						<span
							class="flex items-center justify-center rounded-full w-6 h-6 bg-brand-surface text-white text-xs"
						>
							{pids.length}
						</span>
					{/if}
				</Button>
			</div>
			<div class="properties relative flex-shrink-0">
				<PopUnder popupPosition="left" bind:popUnderOpen={displayProperties}>
					<Button slot="clickable" icon="checklist"
						class="{displayProperties ? "text-brand-text bg-fltr-surface" : "text-primary-text"} border-primary-border"
						iconClass="{displayProperties ? "text-secondary-icn" : "text-primary-icn"} size-5"
						>
						<span class="px-2 py-0.5">Properties</span>
					</Button>
					<ul class="bg-fltr-surface border border-primary-border rounded p-4 flex flex-col gap-3 shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.25)]" slot="dropdown">
						<!-- {#key hiddenProps} -->
							{#each propertyItemHidden as property}
								<li class="flex flex-row justify-between items-center gap-8">
									<span>{property.short || property.name}</span>
									<CheckBox bind:checked={property.shown}></CheckBox>
								</li>
							{/each}
						<!-- {/key} -->
					</ul>
				</PopUnder>
			</div>
		</div>
		<div class="flex flex-1 h-full">
			<table class="w-full flex-shrink-0 rows h-full">
				<thead class="rows__thead font-semibold">
					<th>
						<center class="pl-4 w-full flex items-center font-bold">
							<center class="size-5">#</center>
						</center>
					</th>
					<th><div class="th">TIME</div></th>
					{#each propertyItemHidden as property}
						{#if property.shown}
							<th><div class="th uppercase">{property.name}</div></th>
						{/if}
					{/each}
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
							<!-- <td>{index}</td> -->
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
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<div transition:slide={{ axis: 'y', duration: 150, easing: cubicOut }} class="w-0" on:click|stopPropagation>
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
							{#each propertyItemHidden as property}
								{#if property.shown}
									<td class="truncate max-w-xs">
										{trace[property.id] || "NaN"}
									</td>
								{/if}
							{/each}
						</tr>
					{/each}
					{#if !rows.length}
						<tr>
							<td colspan="7" class="border-none text-secondary-text">
								<center>
									No results found.
								</center>
							</td>
						</tr>
					{/if}
					<tr>
						<td class="border-0" colspan="7">
							<div class="flex justify-between --pt-[30px] max-w-full">
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
												} rounded-sm h-full px-[10px] py-[10px] min-w-[calc(1lh+22px)]"
												on:click={() => {
													currentPage = page.number
												}}
												loading={currentPage === page.number && awaiting}
											>
												{page.number}
											</Button>
										</li>
									{/each}
								</ul>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<FiltersDrawer
	bind:pids
	bind:open={filterDrawer}
	{client}
	{behaviorId}
/>

<style lang="postcss">
	table.rows {
		@apply pr-4 border-separate border-spacing-y-[13px] w-full pt-[30px];

		thead th {
			@apply cursor-pointer;
			@apply font-medium text-tertiary-text text-left flex-row;
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
