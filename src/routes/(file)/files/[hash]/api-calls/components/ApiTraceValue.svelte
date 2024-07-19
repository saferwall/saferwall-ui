<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import type { Saferwall } from '$lib/types';
	import { hexToASCII, toHexString } from '$lib/utils';
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
						lines.push([hexStr, hexToASCII(hexStr.join(' '))]);
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

<div class="flex flex-col value flex-1">
	{#if val}
		<div class="value-hex flex flex-col relative">
			{#if Array.isArray(val)}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="relative flex flex-col gap-x-4 w-full text-sm max-h-96 overflow-y-auto border-b border-t pl-10"
				>
					<span class="absolute left-0 w-5 h-5 p-1">
						<Icon
							on:click={onToggleMouseUp}
							name="arrow-down"
							size={`w-full h-full ${open ? '' : '-rotate-90'}`}
						/>
					</span>
					{#each hex as [v, string], index}
						{#if open || index === 0}
							<div class="flex flex-row gap-4">
								<div data-hex>
									<pre>{v.join(' ')}</pre>
								</div>
								<div data-string>{string}</div>
							</div>
						{/if}
					{/each}
					{#if open && buffId && value.val?.length <= 5000}
						<div class="my-3">
							<Button size="xs" {loading} disabled={loading} on:click={onClickLoadMore}>
								Load All
							</Button>
						</div>
					{/if}
				</div>
			{:else}
				{value.val}
			{/if}
		</div>
	{/if}

	{#if value.in}
		<div class="value-in">
			<Icon size="w-4 h-4" class="value-icon" name="value-in" />
			<span class="value-hex">
				{value.in}
			</span>
		</div>
	{/if}

	{#if value.out}
		<div class="value-out">
			<Icon size="w-4 h-4" class="value-icon" name="value-out" />
			<span class="value-hex">
				{value.out}
			</span>
		</div>
	{/if}
</div>

<style lang="postcss">
	.value {
		&-out,
		&-in {
			@apply flex flex-row items-center;

			.value-icon {
				@apply block w-3 h-3 bg-red-500;
			}
		}

		&-hex {
			@apply font-sans;
			@apply flex flex-col;
		}

		[data-hex] {
			@apply col-span-2 flex gap-2 items-center;
		}
		[data-string] {
			@apply col-span-1 border-r border-l w-56 px-2;
		}
	}
</style>
