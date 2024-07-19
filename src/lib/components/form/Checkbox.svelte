<script lang="ts">
	export let checked = false;
	export let value: string | undefined = undefined;
	export let size: 'sm' | 'lg' | 'base' = 'base';
</script>

<label class={`${size} ${$$props.class || ''}`}>
	<input type="checkbox" on:click on:change bind:checked {value} {...$$restProps} />
	{#if $$slots}
		<span>
			<slot />
		</span>
	{/if}
</label>

<style lang="scss">
	label {
		@apply cursor-pointer;
		@apply inline-flex items-center space-x-2;

		input {
			@apply w-6 h-6;
			@apply shrink-0;
			@apply outline-none appearance-none;
			@apply relative border-2 border-neutral-500 rounded;
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease;

			&:checked {
				@apply bg-primary border-primary;
			}

			&::after {
				@apply hidden;
				@apply absolute content-[''] w-2/6 h-3/5;
				@apply rotate-45 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2;
				border-width: 0 1.5px 1.5px 0;
			}

			&:checked::after {
				@apply block;
			}

			&:focus {
				@apply border-primary-400;
			}
		}

		&.sm {
			input {
				@apply w-4 h-4 rounded-sm;
			}
		}

		&.lg {
			input {
				@apply w-8 h-8;
			}
		}
	}
</style>
