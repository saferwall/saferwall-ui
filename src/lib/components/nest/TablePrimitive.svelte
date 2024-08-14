<script lang="ts">
	import Primitive from "./Primitive.svelte";
	import type { PrimitiveType } from "./Primitive.svelte";

	
	export let value: PrimitiveType[] = [];
	export let showNumbers = true;

</script>

<table class="table-border-base w-fit rounded border-zinc-300 dark:!border-zinc-600 [&_*]:!border-inherit">
	<thead>
		{#if showNumbers}
			<th class="text-center px-2">Index</th>
		{/if}
		<th class="text-center">Value</th>
	</thead>
	<tbody>
		{#each value as v, index}
			<tr>
				{#if showNumbers}
					<td class="px-1 text-center">
						{index}
					</td>
				{/if}
				<td><Primitive value={v}></Primitive></td>
			</tr>
		{/each}
	</tbody>
</table>