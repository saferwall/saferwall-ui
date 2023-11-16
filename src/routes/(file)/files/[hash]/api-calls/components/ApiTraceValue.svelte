<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { Saferwall } from '$lib/types';

	export let name: string;
	export let type: string;
	export let value: Saferwall.ApiCall.EntryValue;
</script>

<div class="flex flex-col value">
	{#if value.val}
		<span class="value-hex">
			{value.val}
		</span>
	{/if}

	{#if value.in}
		<div class="value-in">
			<Icon class="value-icon" name="value-in" />
			<span class="value-hex">
				{value.in}
			</span>
		</div>
	{/if}

	{#if value.out}
		<div class="value-out">
			<Icon class="value-icon" name="value-out" />
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
			@apply flex flex-row;

			.value-icon {
				@apply block w-3 h-3 bg-red-500;
			}
		}

		&-hex {
			@apply block ml-3 font-sans;
		}
	}
</style>
