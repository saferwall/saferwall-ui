<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let max = 1;
	export let border = false;
	export let name: string | undefined = undefined;

	type MultitoggleItem = {
		label: string;
		value: any;
	} & Partial<{
		checked: boolean;
	}>;
	export let items: MultitoggleItem[] = [];

	$: selected = new Set([...items.filter((i) => i.checked)]);
	$: dispatch('change', selected);

	const dispatch = createEventDispatcher();

	const onToggleMouseUp = (target: MultitoggleItem) => {
		selected = new Set([
			...items.filter((item) => {
				const targetItem = item == target;
				if (max === 1) {
					return targetItem;
				}

				if (!targetItem) {
					return selected.has(item);
				}

				if (selected.has(item)) {
					return false;
				}

				if (selected.size >= max) {
					return false;
				}

				return true;
			})
		]);

		items = [
			...items.map((item) => {
				item.checked = selected.has(item);
				return item;
			})
		];
	};
</script>

<ul class="multitoggle" class:with-border={border}>
	{#each items as item}
		<li class="item whitespace-nowrap" class:active={selected.has(item)} on:click={() => onToggleMouseUp(item)}>
			<input type="checkbox" {name} bind:value={item.value} checked={selected.has(item)} />
			{item.label || item.value}
		</li>
	{/each}
</ul>

<style lang="postcss">
	.multitoggle {
		@apply inline-flex items-center rounded-full space-x-1;

		&.with-border {
			@apply border border-zinc-300 dark:border-zinc-600 p-1.5;

			.item {
				@apply py-1.5 px-4;
			}
		}

		.item {
			@apply py-2 px-5 rounded-full;
			@apply text-zinc-400 dark:text-zinc-500 cursor-pointer;

			&:hover,
			&.active {
				@apply bg-primary text-white;
			}

			input {
				@apply hidden;
			}
		}
	}
</style>
