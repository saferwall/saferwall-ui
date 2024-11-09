<script lang="ts">
	import Expandable from "$lib/components/Expandable.svelte";
	import Button from "$lib/components/form/Button.svelte";
	import { hexToActualASCIIForHexDump, toHexString } from "$lib/utils";
	import { createEventDispatcher } from "svelte";

	export let value: string | [string, string][];
	export let buf_id: string;
	export let loading = false;

	let open = false;

	$: hex = Array.isArray(value)
		? (value as any[]).reduce(
				([lines, current], int, index) => {
					current.push(int);

					if (current.length === 16 || value.length === index) {
						const hexStr = toHexString(current);
						lines.push([hexStr, hexToActualASCIIForHexDump(hexStr.join(' '))]);
						current = [];
					}

					return [lines, current];
				},
				[[], []]
			)[0]
		: [];

	const dispatch = createEventDispatcher();
	const onClickLoadMore = () => {
		dispatch('load');
	};
</script>

<div class="flex flex-col">
	{#if Array.isArray(value)}
		<div class="flex gap-x-4 w-full text-xs">
			<Expandable expandable={true} bind:open class="gap-2">
				<div class="flex flex-row gap-4 font-['Roboto_Mono'] font-semibold text-[12px]" slot="header">
					{#if hex[0] && hex[0][0]}
						<div>{hex[0][0].join(" ")}</div>
						<div>{hex[0][1]}</div>
					{:else}
						<div class="text-secondary-text">empty</div>
					{/if}
				</div>
				<div class="max-h-96 overflow-y-auto overflow-x-clip pr-3" slot="expanded">
					{#each hex as [v, string], index}
						<div class="flex flex-row gap-4 font-['Roboto_Mono'] font-semibold text-[12px] text-table-res-text w-fit">
							<div>{(index * 16).toString(16).padStart(16, "0")}</div>
							<div>{v.join(" ")}</div>
							<div>{string}</div>
						</div>
					{/each}
					{#if buf_id && value?.length <= 4096}
						<div class="my-3">
							<Button size="xs" {loading} disabled={loading} on:click={onClickLoadMore}>
								Load All
							</Button>
						</div>
					{/if}
				</div>
			</Expandable>
		</div>
	{:else}
		{value}
	{/if}
</div>