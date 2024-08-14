<script lang="ts">
	export let label = '';
	export let placeholder = ' ';
	export let icon: string = '';
	export let type = 'text';
	export let error = false;
	export let value: string | undefined = undefined;

	const isPassword = type === 'password';
	$: passwordVisible = type !== 'password';

	const onPasswordEyeTogglePress = () => {
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
		{placeholder}
		class="input__element bg-transparent {$$props.class} {icon ? 'input--icon' : ''}"
	/>
	{#if isPassword}
		<button class="password-icon" type="button" on:mousedown={onPasswordEyeTogglePress}>
			<svg class:visible={passwordVisible}><use href="/images/icons.svg#icon-eye" /></svg>
		</button>
	{/if}
</label>

<style lang="scss">
	.input {
		@apply flex w-full relative;

		input {
			@apply focus:outline-none;
			@apply border border-neutral-700 focus:border-gray-500 rounded;
		}

		&__element {
			@apply w-full;
			@apply px-4 pt-3 pb-3;

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
			@apply font-regular placeholder:font-regular;
			@apply absolute transition-all;
			@apply text-neutral-500 left-4 top-1/2 -translate-y-1/2 text-xs;
		}

		&:has(input:not(:placeholder-shown)),
		&:has(:focus) {
			.input__label {
				@apply top-4 text-xs;
			}
		}

		.icon {
			@apply w-5 h-5;
			@apply text-neutral-400 hover:cursor-pointer hover:text-neutral-900;
			@apply absolute left-3 -translate-y-1/2 top-1/2;
		}

		.password-icon {
			@apply w-6 h-6;
			@apply text-neutral-400 hover:cursor-pointer hover:text-neutral-900;
			@apply absolute right-3 -translate-y-1/2 top-1/2;

			&.visible {
				@apply text-primary animate-pulse;
			}

			svg {
				@apply w-full h-full;
			}
		}
	}
</style>
