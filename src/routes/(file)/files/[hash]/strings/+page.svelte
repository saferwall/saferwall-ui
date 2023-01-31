<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Select from '$lib/components/form/Select.svelte';
	import BaseCard from '$lib/components/cards/BaseCard.svelte';

	export let data: PageData;

	const maxPages = 5;

	// TODO: implement search
	// TODO: to upgrade, use a clean one
	$: pages = Array(maxPages)
		.fill(0)
		.map((_val, index) => {
			const page = currentPage + (index - Math.floor(maxPages / 2));
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
		return `?page=${page}&per_page=${perPage}`;
	};

	const handlePerPage = (page: number, event: any) => {
		goto(generatePagination(page, parseInt(event.target.value)));
	};

	$: items = Object.entries(data.pagination.items).reduce(
		(list: [string, string][], [encoding, values]) => {
			const valuesMapped = values.map((val: string) => {
				return [encoding, val];
			});
			return [...list, ...valuesMapped];
		},
		[]
	);
</script>

<section class="file__strings container mx-auto">
	<BaseCard class="overflow-x-auto">
		<table class="table">
			<thead>
				<th>
					<div class="flex items-center space-x-3 justify-between">
						<span>Encoding</span>
						<label class="flex-center">
							<Icon name="search" size="w-4 h-4" class="text-gray-300" />
							<input type="text" placeholder="Search encodings..." />
						</label>
					</div>
				</th>
				<th>
					<div class="flex items-center space-x-3 justify-between">
						<span>Value</span>
						<label class="flex-center">
							<Icon name="search" size="w-4 h-4" class="text-gray-300" />
							<input type="text" placeholder="Search value..." />
						</label>
					</div>
				</th>
			</thead>
			<tbody>
				{#each items as item}
					<tr>
						<td>{item[0]}</td>
						<td>{item[1]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<form class="flex justify-end space-x-4">
			<ul class="flex space-x-2">
				{#each pagesButtons as page}
					<li>
						<Button
							class={currentPage === page ? 'active' : ''}
							href={typeof page === 'number' ? generatePagination(page, perPage) : undefined}
						>
							{page}
						</Button>
					</li>
				{/each}
			</ul>
			<div on:change={(event) => handlePerPage(currentPage, event)}>
				<Select name="per_page">
					{#each perPages as count}
						<option selected={perPage == count}>{count}</option>
					{/each}
				</Select>
			</div>
		</form>
	</BaseCard>
</section>

<style lang="scss">
	table {
		th {
			@apply border rounded;
			@apply text-left px-6 py-5;

			input {
				@apply rounded;
				@apply p-2 font-normal placeholder:font-thin focus:outline-none;
			}
		}

		tr {
			@apply border even:bg-gray-50;
			td {
				@apply text-sm text-grayx-900 p-4;

				&:first-child {
					@apply border-r;
				}
			}
		}
	}
</style>
