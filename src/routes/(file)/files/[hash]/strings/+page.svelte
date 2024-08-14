<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Select from '$lib/components/form/Select.svelte';
	import Card from '$lib/components/Card.svelte';

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

	$: items = Object.entries(data.pagination?.items ?? {}).reduce(
		(list, [encoding, values]: [string, any]) => {
			const valuesMapped = values.map((val: string) => {
				return [encoding, val];
			});
			return [...list, ...valuesMapped];
		},
		[] as string[][]
	);
</script>

<section class="file__strings container mx-auto">
	<Card class="overflow-x-auto">
		<table class="table">
			<thead>
				<th class="w-1/4">
					<div class="flex items-center space-x-3 justify-between">
						<span class="font-semibold">Encoding</span>
						<label class="flex-center">
							<Icon name="search" size="w-4 h-4" class="text-gray-300" />
							<input type="text" placeholder="Search encodings..." />
						</label>
					</div>
				</th>
				<th>
					<div class="flex items-center space-x-3 justify-between">
						<span class="font-semibold">Value</span>
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
			<div>
				<Select name="per_page" on:change={(event) => handlePageLimit(currentPage, event)}>
					{#each perPages as count}
						<option selected={perPage == count}>{count}</option>
					{/each}
				</Select>
			</div>
		</form>
	</Card>
</section>

<style lang="postcss">
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
				@apply text-xs text-neutral-900 p-4;

				&:first-child {
					@apply border-r;
				}
			}
		}
	}
</style>
