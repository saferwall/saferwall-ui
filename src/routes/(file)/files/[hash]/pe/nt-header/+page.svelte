<script lang="ts">
	import {
		getDataDirectoryLabel,
		translateKeyToTitle,
		translateGroupValue,
		valueToHex
	} from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ntHeaders = Object.entries(data.ntHeader).reduce(
		(groups: any[], [name, entries]: [string, any]) => {
			if (name === 'data_directories') {
				groups.push({
					name: 'Data Directory',
					columns: ['', 'Size', 'Virtual Address'],
					items: entries.map(
						(
							{ size, virtual_address }: { size: Number; virtual_address: number },
							index: number
						) => {
							return {
								name: getDataDirectoryLabel(index),
								value: valueToHex(size),
								comment: valueToHex(virtual_address)
							};
						}
					)
				});
				return groups;
			}

			groups.push({
				name: translateKeyToTitle(name),
				items: Object.entries(entries!)
					.map(([key, value]) => {
						const origValue = value;
						value = ['string', 'number'].includes(typeof value) ? valueToHex(origValue) : origValue;
						return {
							name: translateKeyToTitle(key),
							value: value,
							comment: translateGroupValue(origValue, name, key)
						};
					})
					.filter((a) => a)
			});

			return groups;
		},
		[]
	);
</script>

<section class="divide-y">
	{#each ntHeaders as group}
		<article class="py-10 space-y-4">
			<h1 class="title">{group.name}</h1>
			<table class="w-full">
				{#if group.columns}
					<thead>
						{#each group.columns as column}
							<th>{column}</th>
						{/each}
					</thead>
				{/if}
				<tbody>
					{#each group.items as item}
						<tr>
							<td class="lg:w-1/4 font-semibold">{item.name}</td>
							<td class="lg:w-1/4">{item.value}</td>
							<td class="lg:w-1/2">{item?.comment}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</article>
	{/each}
</section>

<style lang="scss">
	section {
		article:first-child {
			@apply pt-0;
		}
	}
</style>
