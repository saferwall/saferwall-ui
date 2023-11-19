<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import type { Saferwall } from '$lib/types';
	import { hexToASCII, toHexString } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	export let value: Saferwall.Behaviors.ApiTrace.EntryValue;

	const dispatch = createEventDispatcher();

	$: [hex] = Array.isArray(value.val)
		? value.val.reduce(
				([lines, current], int, index) => {
					current.push(Math.abs(int));
					if (current.length === 16 || value.val === index) {
						const hexStr = toHexString(current);
						lines.push([hexStr, hexToASCII(hexStr.join(' '))]);
						current = [];
					}

					return [lines, current];
				},
				[[], []]
		  )
		: [];

	$: buffId = value.buf_id;

	let loading = false;
	let open = false;
	const onToggleMouseUp = () => (open = !open);

	const onLoadMoreMouseUp = (e: MouseEvent) => {
		dispatch('load', buffId);
		loading = true;
	};
</script>

<div class="flex flex-col value flex-1">
	{#if value.val}
		<div class="value-hex flex flex-col">
			{#if Array.isArray(value.val)}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="flex flex-col gap-x-4 w-full text-sm">
					{#each hex as [v, string], index}
						{#if open || index === 0}
							<div class="flex flex-row gap-4">
								<div class="col-span-2 flex gap-2 items-center">
									<span class="w-3"
										>{#if index === 0}
											<Icon
												on:click={onToggleMouseUp}
												name="arrow-down"
												size={`w-3 h-3 ${open ? '' : '-rotate-90'}`}
											/>
										{/if}</span
									>
									<pre>{v.join(' ')}</pre>
								</div>
								<div class="col-span-1 border-r border-l w-36 px-0.5">{string}</div>
							</div>
						{/if}
					{/each}
					{#if buffId && open && value.val?.length <= 5000}
						<div>
							<Button {loading} on:mouseup={onLoadMoreMouseUp}>Load All</Button>
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

<style lang="scss">
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
	}
</style>
