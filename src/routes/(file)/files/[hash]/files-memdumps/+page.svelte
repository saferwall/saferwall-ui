<script lang="ts">
	import { goto, pushState } from '$app/navigation';
	import { categoriesList, convertBytes, getArtifcatKind } from '$lib/utils';
	import { quintOut } from 'svelte/easing';
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

	$: console.log({checkboxes, categories});

	function convertPerPageStringToNumber(perPageString: string) {
		perPage = Number(perPageString);
	}

	function convertPerPageNumberToString(perPage: number) {
		perPageString = String(perPage);
	}

	let changes: string[] = [];

	function subscribe(obj: Record<string, any>) {
		changes = [...changes, Object.keys(obj)[0]];
	}

	let dontFireNext = true;

	$: convertPerPageStringToNumber(perPageString);
	$: convertPerPageNumberToString(perPage);

	$: subscribe({perPage});
	$: subscribe({currentPage});
	$: subscribe({categories});
	$: subscribe({search});

	$: processChanges(changes);

	const debouncedGetNewData = debounce(() => {
		getNewData(1);
	}, 500);

	async function getNewData(curPage = currentPage) {
		awaiting = true;
		const [res] = await tryCatch(data.client.getBehaviorArtifacts(data.behaviorId, categories, {
			per_page: perPage,
			page: curPage,
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
		console.log({_changes, dontFireNext});
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
			}
			if (categories.length) {
				newUrl.searchParams.set("categories", categories.join(","));
			}
			pushState(newUrl.toString(), "");
		if (_changes.includes("search")) {
			currentPage = 1;
			debouncedGetNewData();
		} else {
			if (changes.includes("perPage")) {
				currentPage = 1;
			}
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

	$: console.log({pagination, perPage, perPageString});

	let awaiting = false;

	const generateDownloadLink = (item: Saferwall.Behaviors.Artifacts): string => {
		return `${PUBLIC_ARTIFACTS_URL}${hash}/${behaviorId}/artifacts/${item.name}`;
	};
</script>

<div class="container mx-auto flex flex-col gap-4 relative overflow-hidden rounded-xl">
	<div
		data-sveltekit-preload-data
		class="flex flex-col bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white rounded overflow-auto w-full h-full p-6"
	>
	<!-- bind:this={form} -->
		<div
			data-sveltekit-keepfocus
			class="flex items-center justify-center gap-12"
		>
			<Input name="search" icon={awaiting ? "loading" : "search"} bind:value={search} placeholder="Search anything..." class="border-primary-border placeholder:text-searchbar-text" iconClass="text-gray-500 {awaiting ? "animate-spin" : ""}" />
			<div class="grid grid-cols-2 gap-2 xl:gap-4 text-xs flex-shrink-0 flex-grow dark:text-zinc-200 text-zinc-800">
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

	<Card padding={false} class="dark:bg-zinc-900">
		<div class="pb-2">
			<table class="table-auto w-full">
				<thead class="text-left uppercase text-zinc-600 dark:text-zinc-400 text-xs">
					<th colspan="2">File Name</th>
					<th class="lg:w-44">Category</th>
					<th class="lg:w-44">Verdict</th>
					<th class="text-center w-fit"></th>
				</thead>
				<tbody class="divide-y divide-zinc-300 dark:divide-zinc-700">
					{#each items as item}
						<tr class="cursor-pointer" on:click={() => (item._open = !item._open)}>
							<td>
								<div class={`transition-all duration-200 ${item._open ? '' : '-rotate-90'}`}>
									<Icon name="arrow-down" size="w-3 h-5" />
								</div>
							</td>
							<td>
								<p>
									{item.name}
								</p>
							</td>
							<td class="lg:w-44 capitalize">
								{getArtifcatKind(item.kind)}
							</td>
							<td class="lg:w-44">
								<div class="font-medium text-sm {item.detection ? "text-alert-red bg-[#ED4060]/15 flex gap-2 items-center w-fit px-2.5 py-1 rounded-sm" : "text-secondary-text"}">
									{#if item.detection}
										<Icon name="unsafe" class="size-3.5"></Icon>
									{/if}
									{item.detection || 'N/A'}
								</div>
							</td>
							<td class="w-8">
								<div class="flex flex-row items-center justify-center gap-2 w-fit">
									<a
										download={item.name}
										href={generateDownloadLink(item)}
										on:click={(event) => event.stopImmediatePropagation()}
										class="flex items-center justify-center w-8 h-8 rounded-full  border text-primary border-primary stroke-2 hover:bg-primary/20"
									>
										<Icon size="w-4 h-4" name="download-2" />
									</a>
									<!-- <div
										class="flex items-center justify-center w-8 h-8 rounded-full bg-white border text-primary stroke-2"
									>
										<Icon size="w-4 h-4" name="eye" />
									</div> -->
								</div>
							</td>
						</tr>
						<tr class="py-0 border-none">
							<td class="!py-0" colspan="7">
								{#if item._open}
									<div
										class="p-4 text-zinc-900 dark:text-zinc-100"
										transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
									>
										<div class="border rounded-lg border-zinc-300 dark:border-zinc-700">
											<TableKeyValue
												header={false}
												lines={true}
												items={Object.entries({
													'File Size': convertBytes(item.size),
													// @ts-ignore
													Magic: item.magic,
													SHA256: item.sha256,
													'Matched Rules': item.matched_rules.join(', ')
												}).filter(([_, val]) => val)}
											/>
										</div>
									</div>
								{/if}
							</td>
						</tr>
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
			@apply border-b border-zinc-300 dark:border-zinc-700;

			th {
				@apply font-medium py-4;

				&:first-child,
				&:last-child {
					@apply px-6;
				}
			}
		}

		tbody {
			tr td {
				&:first-child {
					@apply w-6 text-neutral-400;
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
