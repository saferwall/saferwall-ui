<script lang="ts">
	import Expandable from '$lib/components/Expandable.svelte';
import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import type { Saferwall } from '$lib/types';
	import { hexToActualASCIIForHexDump, hexToASCII, toHexString } from '$lib/utils';
	import { createEventDispatcher, getContext } from 'svelte';

	export let loading = false;
	export let value: Saferwall.Behaviors.ApiTrace.EntryValue;

	$: buffId = value.buf_id;
	$: val = value.val;
	$: hex = Array.isArray(val)
		? val.reduce(
				([lines, current], int, index) => {
					current.push(int);

					if (current.length === 16 || val.length === index) {
						const hexStr = toHexString(current);
						lines.push([hexStr, hexToActualASCIIForHexDump(hexStr.join(' '))]);
						current = [];
					}

					return [lines, current];
				},
				[[], []]
			)[0]
		: [];

	let open = false;
	const onToggleMouseUp = () => (open = !open);

	const dispatch = createEventDispatcher();
	const onClickLoadMore = (e: MouseEvent) => {
		dispatch('load');
	};
</script>

<div class="flex flex-col flex-1">
	{#if val}
		<div class="flex flex-col">
			{#if Array.isArray(val)}
				<div class="flex gap-x-4 w-full text-xs">
					<Expandable expandable={true} bind:open class="gap-2">
						<div class="flex flex-row gap-4 font-['Roboto_Mono'] font-semibold text-[12px]" slot="header">
							<div>{hex[0][0].join(" ")}</div>
							<div>{hex[0][1]}</div>
						</div>
						<div class="max-h-96 overflow-y-auto overflow-x-clip" slot="expanded">
							{#each hex as [v, string], index}
								<div class="flex flex-row gap-4 font-['Roboto_Mono'] font-semibold text-[12px] text-table-res-text pr-2">
									<div>{(index * 16).toString(16).padStart(16, "0")}</div>
									<div>{v.join(" ")}</div>
									<div>{string}</div>
								</div>
							{/each}
							{#if buffId && value.val?.length <= 4096}
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
				{value.val}
			{/if}
		</div>
	{/if}
	{#if value.in}
		<div class="flex items-center gap-2">
			<div class="flex items-center">
				<Icon size="size-3.5" class="" name="value-in" />
			</div>
			<span class="value-hex">
				{value.in}
			</span>
		</div>
	{/if}

	{#if value.out}
		<div class="flex items-center gap-2">
			<div class="flex items-center">
				<Icon size="size-3.5" class="" name="value-out" />
			</div>
			<span class="value-hex">
				{value.out}
			</span>
		</div>
	{/if}
</div>

<style lang="postcss">
</style>
