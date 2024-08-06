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

	let searchValue = "";
	let searchEncodings = "";
</script>

<section class="file__strings container mx-auto">
	<Card class="overflow-x-auto">
		<table class="table">
			<thead>
				<th class="w-1/4">
					<div class="flex items-center space-x-3 justify-between">
						<span class="font-semibold">Encoding</span>
						<label class="flex-center flex gap-2">
							<Icon name="search" size="w-4 h-4" class="text-zinc-400 dark:text-zinc-500" />
							<input type="text" placeholder="Search encodings..." bind:value={searchEncodings}/>
						</label>
					</div>
				</th>
				<th>
					<div class="flex items-center space-x-3 justify-between">
						<span class="font-semibold">Value</span>
						<label class="flex-center flex gap-2">
							<Icon name="search" size="w-4 h-4" class="text-zinc-400 dark:text-zinc-500" />
							<input type="text" placeholder="Search value..." bind:value={searchValue}/>
						</label>
					</div>
				</th>
			</thead>
			<tbody>
				{#each items.filter(i =>
					i[0].toLowerCase().includes(searchEncodings.toLowerCase())
					&&
					i[1].toLowerCase().includes(searchValue.toLowerCase()))
				as item}
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
			@apply border border-zinc-300 dark:border-zinc-700 rounded;
			@apply text-left px-6 py-5;

			input {
				@apply rounded;
				@apply p-2 font-normal placeholder:font-thin focus:outline-none;
			}
		}

		tr {
			@apply border border-zinc-300 dark:border-zinc-700 even:bg-zinc-100 even:dark:bg-zinc-800;
			td {
				@apply text-xs text-zinc-900 dark:text-zinc-100 p-4;

				&:first-child {
					@apply border-r border-zinc-300 dark:border-zinc-700;
				}
			}
		}
	}
</style>
