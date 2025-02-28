<script lang="ts">
	export let checked = false;
</script>

<input type="checkbox" on:click on:change bind:checked {...$$restProps} />

<style lang="postcss">
		input {
			@apply cursor-pointer;
			@apply w-5 h-5;
			@apply shrink-0;
			@apply outline-none appearance-none;
			@apply relative rounded-[5px] border-[1px] border-elm-border;
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease;
			
			&:checked {
				@apply bg-primary border-primary;
			}

			&::after {
				@apply hidden border-white;
				@apply absolute content-[''] w-[30%] h-[55%];
				@apply rotate-45 bottom-0 left-0 translate-x-[115%] -translate-y-[50%];
				border-width: 0 2px 2px 0;
			}

			&:checked::after {
				@apply block;
			}
		}
</style>
