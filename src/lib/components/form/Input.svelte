<script lang="ts">
	export let label = '';
	export let placeholder = ' ';
	export let icon: string = '';
	export let type = 'text';
	export let error = false;
	export let value: string | undefined = undefined;

	const isPassword = type === 'password';
	$: passwordVisible = type !== 'password';

	const onPasswirdIconMouseUp = () => {
		type = type === 'password' ? 'text' : 'password';
	};
</script>

<label class="input peer-focus" class:labeled={label} class:error>
	{#if icon}
		<svg class="icon"><use href="/images/icons.svg#icon-{icon}" /></svg>
	{/if}
	{#if label}
		<span class="input__label">{label}</span>
	{/if}
	<input
		{...$$props}
		on:change
		bind:value
		{...{type}}
		{placeholder}
		class="input__element {$$props.class} {icon ? 'input--icon' : ''}"
	/>
	{#if isPassword}
		<button class="password-dim password-icon outline-none" class:visible={passwordVisible} type="button" on:click={onPasswirdIconMouseUp}>
			<svg class="password-dim"
				><use href="/images/icons.svg#icon-eye" /></svg
			>
		</button>
	{/if}
</label>

<style lang="postcss">
	.input {
		@apply flex w-full relative;

		&__element {
			@apply w-full;
			@apply px-4 pt-3 pb-3;
			@apply border rounded;

			&.input--icon {
				@apply pl-10;
			}
		}

		input:read-only {
			@apply cursor-default;
		}

		&.error {
			.input__element {
				@apply border-red-400;
			}
			.input__label {
				@apply text-red-400;
			}
		}

		&.labeled {
			.input__element {
				@apply px-4 pt-6 pb-2;
			}
		}

		&__label {
			@apply font-light;
			@apply absolute transition-all;
			@apply text-neutral-500 left-4 top-1/2 -translate-y-1/2 text-sm;
		}

		&:has(input:not(:placeholder-shown)),
		&:has(:focus) {
			.input__label {
				@apply top-4 text-sm;
			}
		}

		.icon {
			@apply w-5 h-5;
			@apply text-neutral-400 hover:cursor-pointer hover:text-neutral-900;
			@apply absolute left-3 -translate-y-1/2 top-1/2;
		}

		.password-dim {
			@apply w-6 h-6;
		}
		.password-icon {
			@apply text-neutral-400 hover:cursor-pointer hover:text-neutral-900;
			@apply absolute right-3 -translate-y-1/2 top-1/2;

			&.visible {
				@apply text-primary animate-pulse;
			}
		}
	}
</style>
