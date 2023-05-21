<script lang="ts">
	let cclass = '';
	export let type = 'text';
	export let label = '';
	export let error = false;
	export let placeholder = ' ';
	export { cclass as class };

	const isPassword = type === 'password';
	const togglePassword = () => {
		type = type === 'password' ? 'text' : 'password';
	};
	$: passwordVisible = type !== 'password';

	console.log($$restProps);
</script>

<label class="input peer-focus" class:labeled={label} class:error>
	{#if label}
		<span class="input__label">{label}</span>
	{/if}
	<input on:change class="input__field {cclass}" {type} {placeholder} {...$$restProps} />
	{#if isPassword}
		<svg class="icon" class:visible={passwordVisible} on:mouseup={togglePassword}
			><use href="/images/icons.svg#icon-eye" /></svg
		>
	{/if}
</label>

<style lang="scss">
	.input {
		@apply flex w-full relative;

		&__field {
			@apply w-full;
			@apply px-4 pt-3 pb-3.5;
			@apply border rounded;
		}

		input:read-only {
			@apply cursor-default;
		}

		&.error {
			.input__field {
				@apply border-red-400;
			}
			.input__label {
				@apply text-red-400;
			}
		}

		&.labeled {
			.input__field {
				@apply px-4 pt-6 pb-2;
			}
		}

		&__label {
			@apply font-light;
			@apply absolute transition-all;
			@apply text-grayx-500 left-4 top-1/2 -translate-y-1/2 text-sm;
		}

		&:has(input:not(:placeholder-shown)),
		&:has(:focus) {
			.input__label {
				@apply top-4 text-sm;
			}
		}

		.icon {
			@apply w-6 h-6;
			@apply text-grayx-400 hover:cursor-pointer hover:text-grayx-900;
			@apply absolute right-3 -translate-y-1/2 top-1/2;

			&.visible {
				@apply text-primary animate-pulse;
			}
		}
	}
</style>
