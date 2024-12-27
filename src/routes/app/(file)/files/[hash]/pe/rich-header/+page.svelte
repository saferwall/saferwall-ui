<script lang="ts">
	import { translateGroupValue, translateKeyToTitle, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	$: richHeaders = data.richHeader?.comp_ids;
	$: columns = Object.keys(richHeaders?.[0]);
</script>

<article class="space-y-4">
	<h1 class="title">Rich Header</h1>
	<table class="w-full">
		<thead>
			{#each columns as column}
				<th>{translateKeyToTitle(column)}</th>
			{/each}
		</thead>
		<tbody>
			{#each richHeaders as item}
				<tr>
					{#each columns as column}
						<td>{translateGroupValue(item[column], 'rich_header', column)}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<ul class="space-y-1">
		<li class="flex flex-row gap-2">
			<b>DanS Offset:</b>
			<p>
				{valueToHex(data.richHeader?.dans_offset)}
			</p>
		</li>
		<li class="flex flex-row gap-2">
			<b>XOR:</b>
			<p>
				{valueToHex(data.richHeader?.xor_key)}
			</p>
		</li>
		<li class="flex flex-col gap-2">
			<b>Raw:</b>
			<p class="border border-neutral-500 p-2 rounded mr-4">
				<code class="break-all">{data.richHeader?.raw}</code>
			</p>
		</li>
	</ul>
</article>
