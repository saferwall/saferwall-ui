<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let max = 1;
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
	};
</script>

<ul class="multitoggle">
	{#each items as item}
		<li class="item" class:active={selected.has(item)} on:mouseup={() => onToggleMouseUp(item)}>
			<input type="checkbox" {name} bind:value={item.value} checked={selected.has(item)} />
			{item.label || item.value}
		</li>
	{/each}
</ul>

<style lang="scss">
	.multitoggle {
		@apply flex items-center rounded-full space-x-1;

		.item {
			@apply py-2 px-4 rounded-full;
			@apply text-neutral-500 cursor-pointer;

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
