<script lang="ts">
	export let name = '';
	export let label = '';
	export let required = false;
	export let disabled = false;
	export let value = "";
</script>

<label class="select peer-focus" class:labeled={label}>
	{#if label}
		<span class="select__label">{label}</span>
	{/if}
	<select {required} {disabled} {name} class="select__field {$$props.class}" bind:value on:change>
		<slot />
	</select>
</label>

<style lang="postcss">
	.select {
		@apply flex w-full relative;

		select {
			@apply text-primary;
		}

		&__field {
			@apply w-full;
			@apply px-4 py-2.5;
			@apply border rounded;
		}

		&.labeled {
			.select__field {
				@apply px-4 pt-2 pb-2;
			}
		}

		&__label {
			@apply font-light;
			@apply absolute transition-all;
			@apply left-4 top-1/2 -translate-y-1/2 text-base;
		}

		.icon {
			@apply w-6 h-6;
			@apply text-neutral-400 hover:cursor-pointer hover:text-neutral-900;
			@apply absolute right-3 -translate-y-1/2 top-1/2;

			&.visible {
				@apply text-primary placeholder:text-primary animate-pulse;
			}
		}
	}
</style>
