<script lang="ts">
	export let checked: boolean = false;
	export let group: undefined = undefined;
	export let value: string | undefined = undefined;
</script>

<label class={$$props.class}>
	<input type="checkbox" on:click on:change bind:group bind:checked {value} {...$$restProps} />
	<slot />
</label>

<style lang="scss">
	label {
		@apply cursor-pointer;

		input {
			@apply w-6 h-6 shrink-0;
			@apply outline-none appearance-none;
			@apply relative border-2 border-neutral-300/40 rounded;
			transition: background-color 0.3s ease, border-color 0.3s ease;

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
	}
</style>
