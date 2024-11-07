<script lang="ts">
	import { goto, pushState } from '$app/navigation';
	import { categoriesList, convertBytes, getArtifcatKind } from '$lib/utils';
	import { cubicOut, quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';

	import { PUBLIC_ARTIFACTS_URL } from '$env/static/public';
	import Card from '$lib/components/Card.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Label from '$lib/components/form/Label.svelte';
	import type { Saferwall } from '$lib/types';
	import Select from '$lib/components/form/Select.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import CheckBox from '$lib/components/form/CheckBox.v2.svelte';
	import { tryCatch } from '$lib/utils/try_catch';
	import debounce from 'debounce';
	import { page } from '$app/stores';

	export let data: PageData;

	let search = data.search;
	let pagination = data.pagination;
	let currentPage = pagination.page;
	let perPage = pagination.per_page;
	let perPageString = perPage.toString();
	$: totalPages = pagination.page_count;
	$: totalCount = pagination.total_count;

	$: checkboxes = categoriesList.reduce((p, c) => {
		p[c.name] = data.filters.categories.includes(c.name);
		return p;
	}, {} as Record<string, boolean>);
	$: categories =  Object.entries(checkboxes).filter(e => e[1]).map(e => e[0]);

	function convertPerPageStringToNumber(perPageString: string) {
		perPage = Number(perPageString);
	}

	function convertPerPageNumberToString(perPage: number) {
		perPageString = String(perPage);
	}

	let changes: string[] = [];

	function subscribe(obj: Record<string, any>) {
		let str = Object.keys(obj)[0];
		if (!changes.includes(str)) {
			changes = [...changes, str];
		}
		changes = [...changes];
	}

	let dontFireNext = true;

	$: convertPerPageStringToNumber(perPageString);
	$: convertPerPageNumberToString(perPage);

	$: subscribe({perPage});
	$: subscribe({currentPage});
	$: subscribe({categories});
	$: subscribe({search});

	$: processChanges(changes);

	const debouncedGetNewData = debounce(getNewData, 500);

	async function getNewData() {
		awaiting = true;
		const [res] = await tryCatch(data.client.getBehaviorArtifacts(data.behaviorId, categories, {
			per_page: perPage,
			page: currentPage,
		}, search));
		awaiting = false;
		changes = [];
		if (!res) {
			goto("summary");
			return;
		}
		pagination = res;
	}

	async function processChanges(_changes: string[]) {
		if (dontFireNext) {
			dontFireNext = false;
			changes = [];
			return;
		}
		if (!_changes.length) return;

		let newUrl = new URL($page.url);
		newUrl.searchParams.set("page", currentPage.toString());
		newUrl.searchParams.set("per_page", perPageString.toString());
		if (search) {
			newUrl.searchParams.set("q", search);
		} else {
			newUrl.searchParams.delete("q");
		}
		if (categories.length) {
			newUrl.searchParams.set("categories", categories.join(","));
		} else {
			newUrl.searchParams.delete("categories");
		}
		pushState(newUrl.toString(), "");
	
		if (changes.includes("perPage") || changes.includes("categories") || changes.includes("search")) {
			currentPage = 1;
		}
		if (_changes.includes("search")) {
			currentPage = 1;
			debouncedGetNewData();
		} else {
			getNewData();
		}
	}

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
		(page, index) => !index || page <= totalCount || page <= perPage
	);

	$: items = pagination.items || [];
	$: hash = data.hash;
	$: behaviorId = data.behaviorId;

	let awaiting = false;

	const generateDownloadLink = (item: Saferwall.Behaviors.Artifacts): string => {
		return `${PUBLIC_ARTIFACTS_URL}${hash}/${behaviorId}/artifacts/${item.name}`;
	};
</script>

<div class="container mx-auto flex flex-col gap-4 relative overflow-hidden rounded-xl">
	<div
		data-sveltekit-preload-data
		class="flex flex-col rounded overflow-auto w-full h-full p-6 bg-secondary-surface"
	>
	<!-- bind:this={form} -->
		<div
			data-sveltekit-keepfocus
			class="flex items-center justify-center gap-12"
		>
			<Input name="search" icon={awaiting ? "loading" : "search"} bind:value={search} placeholder="Search anything..." class="border-primary-border placeholder:text-searchbar-text" iconClass="text-gray-500 {awaiting ? "animate-spin" : ""}" />
			<div class="grid grid-cols-2 gap-2 xl:gap-4 text-xs flex-shrink-0 flex-grow ">
				{#each categoriesList as item}
						<!-- size="sm"
						name="categories"
						value={item.name} -->
						<!-- {item.label} -->
					<button class="flex gap-2 items-center border-none" on:click={() => {
						checkboxes[item.name] = !checkboxes[item.name];
					}}>
						<CheckBox checked={checkboxes[item.name]} />
						{item.label}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<Card padding={false} class="bg-secondary-surface">
		<div class="pb-2">
			<table class="table-auto w-full">
				<thead class="text-left uppercase  text-xs">
					<th colspan="2">File Name</th>
					<th class="lg:w-44">Category</th>
					<th class="lg:w-44">Verdict</th>
					<th class="text-center w-fit"></th>
				</thead>
				<tbody class="divide-y divide-line-surface">
					{#each items as item}
						<tr class="cursor-pointer" on:click={() => (item._open = !item._open)}>
							<td>
								<span class="flex flex-col min-h-8 justify-center">
									<div class="min-h-[1lh] flex items-center justify-center rounded-full !size-5 {item._open ? "bg-brand-surface" : "bg-transparent"}">
										<Icon
											size="size-2.5"
											name="arrow-down"
											class="transition-all {item._open ? "text-white translate-y-[1px]" : "-rotate-90  text-brand-surface"}"
										/>
									</div>
								</span>
							</td>
							<td>
								<p class="flex flex-col">
									<span class="flex flex-col min-h-8 justify-center {item._open ? "text-brand-text font-medium" : "text-primary-text"} transition-colors">
										{item.name}
									</span>
								</p>
							</td>
							<td class="lg:w-44 capitalize">
								<span class="min-h-8 flex flex-col justify-center">
									{getArtifcatKind(item.kind)}
								</span>
							</td>
							<td class="lg:w-44">
								<span class="min-h-8 flex flex-col justify-center">
									<div class=" font-medium text-sm {item.detection ? "text-alert-red bg-[#ED4060]/15 flex gap-2 items-center w-fit px-2.5 py-1 rounded-sm" : "text-secondary-text"}">
										{#if item.detection}
											<Icon name="unsafe" class="size-3.5"></Icon>
										{/if}
										{item.detection || 'N/A'}
									</div>
								</span>
							</td>
							<td class="w-8">
								<div class="flex flex-col items-center justify-center gap-2 w-fit">
									<a
										download={item.name}
										href={generateDownloadLink(item)}
										on:click={(event) => event.stopImmediatePropagation()}
										class="flex items-center justify-center w-8 h-8 rounded-full  border text-primary border-primary stroke-2 hover:bg-primary/20"
									>
										<Icon size="w-4 h-4" name="download-2" />
									</a>
								</div>
							</td>
						</tr>
						{#if item._open}
							<tr class="py-0 border-none">
								<td class="pb-4 px-10" colspan="7">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<div transition:slide={{ axis: 'y', duration: 150, easing: cubicOut }} on:click|stopPropagation>
										<div class="px-5 py-2 rounded border border-line-surface cursor-auto shadow-[0px_1px_12px_0px_rgba(0,_0,_0,_0.07)] bg-p-tree-surface">
											<table class="w-full">
												<tbody class="divide-y divide-line-surface">
													{#each Object.entries({
														'File Size': convertBytes(item.size),
														// @ts-ignore
														Magic: item.magic,
														SHA256: item.sha256,
														'Matched Rules': item.matched_rules.join(', ')
													}).filter(([_, val]) => val) as [key, value]}
														<tr>
															<th class="text-start whitespace-nowrap font-semibold">{key}</th>
															<td class="whitespace-nowrap">{value}</td>
														</tr>
													{/each}
												</tbody>
											</table>
										</div>
									</div>
								</td>
							</tr>
						{/if}
					{:else}
						<tr>
							<td class="py-12 text-center" colspan="6">
								It looks like we didn't find any data.
							</td>
						</tr>
					{/each}
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
	</Card>
</div>

<style lang="postcss">
	table {
		thead {
			@apply border-b border-line-surface;

			th {
				@apply font-semibold py-4 text-tertiary-text;

				&:first-child,
				&:last-child {
					@apply px-6;
				}
			}
		}

		tbody {
			tr td {
				@apply align-top;
				&:first-child {
					@apply w-6;
				}
				&:first-child,
				&:last-child {
					@apply px-4;
				}
				@apply py-2 text-xs;
			}
		}
	}
</style>
