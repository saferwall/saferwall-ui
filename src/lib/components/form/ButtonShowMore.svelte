<script lang="ts">
	export let expanded = false;
	export let mode: 'all' | 'more' = 'all';
</script>

<button type="button" class="button" on:click>
	<span>
		Show {#if expanded}less{:else}{mode}{/if}
	</span>
	<svg class="icon" class:expanded>
		<use href="/images/icons.svg#icon-arrow-down" />
	</svg>
</button>

<style lang="postcss">
	.button {
		@apply relative cursor-pointer focus:outline-none;
		@apply w-full pt-3 select-none flex items-center justify-center space-x-2;
		@apply text-center font-semibold text-primary;
		@apply border-none;

		&:not(:has(.expanded)):before {
			@apply content-[''];
			@apply absolute h-48 -top-48;
			@apply bg-gradient-to-b from-transparent to-white dark:to-neutral-600 w-full;
		}

		.icon {
			@apply w-4 h-4;
			@apply transition-all;

			&.expanded {
				@apply rotate-180;
			}
		}
	}
</style>
