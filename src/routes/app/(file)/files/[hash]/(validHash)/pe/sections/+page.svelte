<script lang="ts">
	import { translateKeyToTitle, translateGroupValue, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	$: sections = data.sections.reduce((groups: any[], { header, entropy }) => {
		const name = String.fromCharCode.apply(null, header.name);

		const items = Object.entries(header).filter(([field]) => field !== 'name');
		items.unshift(['entropy', entropy]);

		groups.push({
			name,
			items: items.map(([key, value]: [string, unknown]) => {
				return {
					name: translateKeyToTitle(key),
					value: valueToHex(value),
					comment: translateGroupValue(value, 'Sections', key)
				};
			})
		});

		return groups;
	}, []);
</script>

<section class="divide-y">
	{#each sections as group}
		<article class="py-10 space-y-4 border-t-zinc-300 dark:border-t-zinc-700">
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
							<td class="lg:w-1/3 font-semibold">{item.name}</td>
							<td class="lg:w-1/3">{item.value}</td>
							<td class="lg:w-1/3 whitespace-pre-wrap">{item?.comment}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</article>
	{/each}
</section>

<style lang="postcss">
	section {
		article:first-child {
			@apply pt-0;
		}
	}
</style>
