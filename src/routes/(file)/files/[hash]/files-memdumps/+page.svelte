<script lang="ts">
	import type { PageData } from './$types';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { convertBytes, getArtifcatKind } from '$lib/utils';

	import Checkbox from '$lib/components/form/Checkbox.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Card from '$lib/components/Card.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Label from '$lib/components/form/Label.svelte';
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import { goto } from '$app/navigation';
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';

	export let data: PageData;

	let form: HTMLFormElement;

	$: filters = data.filters;
	$: categories = data.categories;
	$: items = data.pagination.items || [];
	let search = data.search;

	const generateParams = (categories: string[]) => {
		const query = new URLSearchParams();
		if (categories.length > 0) {
			query.append('categories', categories.join(','));
		}
		if (search && search?.length > 0) {
			query.append('search', search);
		}

		return '?' + query.toString();
	};

	const handleFormChanges = (event: Event) => {
		const data = new FormData(event.currentTarget as HTMLFormElement);
		const activeCategories = data.getAll('categories') as string[];
		goto(generateParams(activeCategories));
	};
</script>

<div class="container mx-auto flex flex-col gap-4 relative overflow-hidden rounded-xl">
	<div
		data-sveltekit-preload-data
		class="flex flex-col bg-white text-gray-700 rounded overflow-auto w-full h-full p-6"
	>
		<form
			data-sveltekit-keepfocus
			class="flex items-center justify-center gap-12"
			bind:this={form}
			on:change={handleFormChanges}
		>
			<Input name="search" icon="search" bind:value={search} placeholder="Search anything..." />
			<div class="grid grid-cols-2 gap-2 xl:gap-4 text-sm flex-shrink-0 flex-grow text-gray-600">
				{#each categories as item}
					<Checkbox
						size="sm"
						name="categories"
						value={item.name}
						checked={filters.categories.includes(item.name)}
					>
						{item.label}
					</Checkbox>
				{/each}
			</div>
		</form>
	</div>

	<Card padding={false}>
		<div class="pb-2">
			<table class="table-auto w-full">
				<thead class="text-left uppercase text-neutral-500 text-sm">
					<th colspan="2">File Name</th>
					<th class="lg:w-44">Category</th>
					<th class="lg:w-44">Verdict</th>
					<!-- <th>Actions</th> -->
				</thead>
				<tbody class="divide-y divide-neutral-100">
					{#each items as item}
						<tr class="cursor-pointer" on:click={() => (item._open = !item._open)}>
							<td>
								<div class={`transition-all duration-200 ${item._open ? '' : '-rotate-90'}`}>
									<Icon name="arrow-down" size="w-3 h-5" />
								</div>
							</td>
							<td>{item.name}</td>
							<td class="lg:w-44 capitalize">
								{getArtifcatKind(item.kind)}
							</td>
							<td class="lg:w-44">
								<Label theme={item.detection ? 'danger' : 'base'}>
									{item.detection || 'N/A'}
								</Label>
							</td>
							<!-- <td>
								<div class="flex flex-row items-center gap-2">
									<div
										class="flex items-center justify-center w-8 h-8 rounded-full bg-white border text-primary stroke-2"
									>
										<Icon size="w-4 h-4" name="download" />
									</div>
									<div
										class="flex items-center justify-center w-8 h-8 rounded-full bg-white border text-primary stroke-2"
									>
										<Icon size="w-4 h-4" name="eye" />
									</div>
								</div>
							</td> -->
						</tr>
						<tr class="py-0 border-none">
							<td class="!py-0" colspan="6">
								{#if item._open}
									<div
										class="p-4 text-gray-900"
										transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
									>
										<div class="border rounded-lg shadow-lg shadow-neutral-100">
											<TableKeyValue
												header={false}
												lines={true}
												items={Object.entries({
													'File Size': convertBytes(item.size),
													'MIME Type': item.file_type,
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
							<td class="py-12 text-center" colspan="4">
								It looks like we didn't find any data.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</div>

<style lang="scss">
	table {
		thead {
			@apply border-b;

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
				@apply py-2 font-light text-sm;
			}
		}
	}
</style>
