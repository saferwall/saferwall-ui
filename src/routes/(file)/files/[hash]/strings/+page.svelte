<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Select from '$lib/components/form/Select.svelte';
	import Card from '$lib/components/Card.svelte';
	import CopyPopup from '$lib/components/partials/CopyPopup.svelte';

	export let data: PageData;

	// TODO: implement search
	// TODO: to upgrade, use a clean one
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

	$: pagesButtons = [1, ...pages, totalPages].filter(
		(page, index, array) => array.indexOf(page) === index
	);

	$: perPages = [5, 10, 20, 40, 50, 100, 300].filter((page) => page <= totalCount);

	$: currentPage = data.pagination.page;
	$: perPage = data.pagination.per_page;
	$: totalPages = data.pagination.page_count;
	$: totalCount = data.pagination.total_count;

	const generatePagination = (page: number, perPage: number) => {
		return (
			'?' +
			new URLSearchParams({
				page: page.toString(),
				per_page: perPage.toString()
			}).toString()
		);
	};

	const handlePageLimit = (page: number, event: any) => {
		goto(generatePagination(page, parseInt(event.target.value)));
	};

	$: _items = data.pagination?.items ?? {};
	$: items = _items.map(i => [i.encoding, i.value]).slice(0, perPage);

	$: searchFilteredItems = items.filter(i =>
					i[0].toLowerCase().includes(searchEncodings.toLowerCase())
					&&
					i[1].toLowerCase().includes(searchValue.toLowerCase()));

	let searchValue = "";
	let searchEncodings = "";
</script>

<section class="file__strings container mx-auto">
	<Card class="overflow-x-auto bg-secondary-surface">
		<table class="text-primary-text table border-spacing-x-[15px] border-separate table-fixed w-full">
			<thead>
				<tr>
					<th class="pb-[10px] font-semibold text-base">Encoding</th>
					<th class="pb-[10px] font-semibold text-base">Value</th>
				</tr>
				<tr class="">
					<th class="border-b-[5px] border-transparent">
						<div class="items-center flex gap-[8px] border border-primary-border pl-[13px] pr-[2px] rounded-sm">
							<Icon name="search" size="size-5" class="text-searchbar-text" />
							<input type="text" class="bg-transparent placeholder:text-searchbar-text !border-none py-[15px] flex-grow [-moz-appearance:textfield] [&::-webkit-calendar-picker-indicator]:hidden" placeholder="Search encodings..." bind:value={searchEncodings} list="encoding_suggestions"/>
							<!-- <datalist id="encoding_suggestions">
								{#each Object.entries(_items).filter(e => e[1].length !== 0).map(e => e[0]) as key}
									<option value={key}></option>
								{/each}
							</datalist> -->
						</div>
					</th>
					<th class="border-b-[5px] border-transparent">
						<div class="items-center flex gap-[8px] border border-primary-border pl-[13px] pr-[2px] rounded-sm">
							<Icon name="search" size="size-5" class="text-searchbar-text" />
							<input type="text" class="bg-transparent placeholder:text-searchbar-text !border-none py-[15px] flex-grow" placeholder="Search value..." bind:value={searchValue}/>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each searchFilteredItems as item}
					<tr class="even:bg-tertiary-surface">
						<td class="p-[13px] rounded-sm">
							{item[0]}
						</td>
						<td class="p-[13px] rounded-sm relative">
							<CopyPopup value={item[1]} class="max-w-full" popupClass="w-fit max-w-[60%] top-[calc(80%)]" copiedText="Value Copied !"/>
						</td>
					</tr>
				{/each}
				{#if searchFilteredItems.length === 0}
					<tr>
						<td class="p-[13px] text-secondary-text text-center">
							No results found.
						</td>
						<td class="p-[13px] text-secondary-text text-center">
							No results found.
						</td>
					</tr>
				{/if}
				<tr>
					<td colspan="2">
						<form class="flex justify-between space-x-4 pt-[30px]">
							<div>
								<Select name="per_page" class="py-[7px] px-[10px] pr-[5px] pl-[3px] bg-secondary-surface border border-secondary-border text-secondary-text rounded-sm" on:change={(event) => handlePageLimit(currentPage, event)}>
									{#each perPages as count}
										<option selected={perPage == count}>{count}</option>
									{/each}
								</Select>
							</div>
							<ul class="flex space-x-2">
								{#each pagesButtons as page}
									<li>
										<Button
											class="{currentPage === page
												?
													"text-white bg-brand-surface"
												:
													`border border-secondary-border text-secondary-text
													hover:text-brand-text hover:bg-brand-CF-surface hover:border-transparent
													active:text-white active:bg-brand-surface`
											} py-[10px] px-[calc(10px+1lh-1.7ch)] rounded-sm"
											href={typeof page === 'number' ? generatePagination(page, perPage) : undefined}
										>
											{page}
										</Button>
									</li>
								{/each}
							</ul>
						</form>
					</td>
				</tr>
			</tbody>
			<colgroup>
				<col span="1" class="w-[34%]">
				<col span="1" class="w-[66%]">
			 </colgroup>
		</table>
	</Card>
</section>

<style lang="postcss">
	table {
		th {
			@apply text-left;
			@apply p-0;

			input {
				@apply font-normal;
			}
		}
		tr {
			td {
				@apply text-xs;
			}
		}
	}
</style>
