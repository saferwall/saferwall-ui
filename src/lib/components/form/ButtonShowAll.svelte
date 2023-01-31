<script lang="ts">
	export let expanded: boolean = false;
</script>

<div class="button" on:mouseup>
	<span>
		Show {#if expanded}less{:else}all{/if}
	</span>
	<svg class="icon" class:expanded>
		<use href="/images/images.svg#icon-arrow-down" />
	</svg>
</div>

<style lang="scss">
	.button {
		@apply relative cursor-pointer;
		@apply w-full pt-3 select-none flex items-center justify-center space-x-2;
		@apply text-center font-semibold text-primary;

		&:not(:has(.expanded)):before {
			@apply content-[''];
			@apply absolute h-48 -top-48;
			@apply bg-gradient-to-b from-transparent to-white w-full;
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
