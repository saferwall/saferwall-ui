<script lang="ts">
	import { translateKeyToTitle } from "$lib/utils";

	export let value: Record<string, any>[] = [];
	export let path: (string | number)[] = [];
	export let tableKey: string | undefined = undefined;
	export let showNumbers = true;

	$: keys = [...value.reduce((p: Set<string>, c: Record<string, any>) => new Set([...p, [...Object.keys(c)]].flat()), new Set<string>())];
</script>

<table class="table-border-base w-fit rounded border-zinc-300 dark:!border-zinc-600 [&_*]:!border-inherit">
	<thead>
		{#if showNumbers}
			<th class="text-center px-1">#</th>
		{/if}
		{#each keys as head}
			<th>{translateKeyToTitle(head, true)}</th>
		{/each}
	</thead>
	<tbody>
		{#each value as v, index}
			<tr>
				{#if showNumbers}
					<td class="px-1">
						<button class="p-2" on:click={() => { path = [...path, ...[tableKey ?? []].flat(), index] }}>
							{index}
						</button>
					</td>
				{/if}
				{#each keys as key}
					<td>
						{#if key in v}
							{#if typeof v[key] !== "object"}
								{v[key].toString()}
							{:else}
								<div class="flex justify-center w-full">
									<button class="py-1 px-4" on:click={() => {
										path = [...path, ...[tableKey ?? []].flat(), index, key];
									}}>Reveal {Array.isArray(v[key]) ? "Table" : "Object"}</button>
								</div>
							{/if}
						{:else}
							{""}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>