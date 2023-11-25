<script lang="ts">
	import type { PageData } from './$types';

	import Checkbox from '$lib/components/form/Checkbox.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Card from '$lib/components/Card.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Label from '$lib/components/form/Label.svelte';
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import ComingSoon from '$lib/components/partials/ComingSoon.svelte';

	export let data: PageData;

	let form: HTMLFormElement;

	$: search = data.search;
	$: filters = data.filters;
	$: categories = data.categories;
	$: items = data.pagination.items;

	const handleFormChanges = () => {};
</script>

<div class="container mx-auto flex flex-col gap-4 relative overflow-hidden rounded-xl">
	<div
		data-sveltekit-preload-data
		class="flex flex-col bg-white text-gray-700 rounded overflow-auto w-full h-full p-6"
	>
		<form
			data-sveltekit-keepfocus
			bind:this={form}
			on:change={handleFormChanges}
			class="flex items-center justify-center gap-12"
		>
			<Input name="search" icon="search" bind:search placeholder="Search anything..." />
			<div class="grid grid-cols-3 gap-2 text-sm flex-shrink-0 flex-grow text-gray-600">
				{#each categories as item}
					<Checkbox size="sm" name="categories" group={filters.categories} value={item.name}>
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
					<th>Category</th>
					<th>Type</th>
					<th>Veridict</th>
					<th>Actions</th>
				</thead>
				<tbody class="divide-y divide-neutral-100">
					{#each items as item}
						<tr class="cursor-pointer" on:click={() => (item.open = !item.open)}>
							<td>
								<div class={`transition-all duration-200 ${item.open ? '' : '-rotate-90'}`}>
									<Icon name="arrow-down" size="w-3 h-5" />
								</div>
							</td>
							<td class="lg:w-1/2">{item.filename}</td>
							<td>{item.category}</td>
							<td>{item.type}</td>
							<td>
								<Label
									theme={item.veridict == 'malicious'
										? 'danger'
										: item.veridict == 'clean'
										? 'primary'
										: 'base'}
								>
									{item.veridict}
								</Label>
							</td>
							<td>
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
							</td>
						</tr>
						<tr class="py-0 border-none">
							<td class="!py-0" colspan="6">
								{#if item.open}
									<div
										class="p-4 text-gray-900"
										transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
									>
										<div class="border rounded-lg shadow-lg shadow-neutral-100">
											<TableKeyValue
												header={false}
												lines={true}
												items={Object.entries(item.metadata)}
											/>
										</div>
									</div>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
	<ComingSoon />
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
