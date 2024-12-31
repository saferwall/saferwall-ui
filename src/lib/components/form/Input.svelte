<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let label = '';
	export let placeholder = ' ';
	export let icon: string = '';
	export let type = 'text';
	export let error = false;
	export let value: string | undefined = undefined;
	export let iconClass = "";
	export let starsForBullets = false;
	export let labelClass = "";
	export let labelStyle = "";
	export let multiline = false;
	export let parentClass = "";

	const isPassword = type === 'password';
	$: passwordVisible = type !== 'password';

	const onClick = () => {
		type = type === 'password' ? 'text' : 'password';
	};
</script>

<label class={twMerge("input peer-focus text-inherit", parentClass)} class:labeled={label} class:error>
	{#if icon}
		<svg class={twMerge("icon text-inherit")}>
			<use href="/images/icons.svg#icon-{icon}" class={twMerge("text-inherit origin-center", iconClass)} />
		</svg>
	{/if}
	{#if label}
		<span class="input__label {labelClass}" style={labelStyle}>{label}</span>
	{/if}
	{#if multiline}
		<textarea
			bind:value
			on:change
			on:focus
			on:blur
			{...$$props}
			{placeholder}
			class="input__element bg-transparent {$$props.class}"
		></textarea>
	{:else}
		<input
			{...$$props}
			on:change
			on:focus
			on:blur
			bind:value
			{...{type}}
			{placeholder}
			class="input__element bg-transparent {starsForBullets && type === "password" ? "font-bold font-['pwd']" : ""} {$$props.class} {icon ? 'input--icon' : ''}"
			data-class="input__element {$$props.class} {icon ? 'input--icon' : ''}"
		/>
	{/if}
	{#if isPassword}
		<button class="password-icon outline-none border-none text-primary-icn flex items-center justify-center" type="button" on:click={onClick}>
			<svg class="size-7">
				<use href="/images/icons.svg#icon-password-visible" class:hidden={!passwordVisible}/>
				<use href="/images/icons.svg#icon-password-invisible" class:hidden={passwordVisible}/>
			</svg>
		</button>
	{/if}
	<slot></slot>
</label>

<style lang="postcss">
	@font-face {
		font-family: 'pwd';
		src: url('/pwd.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}
	
	.input {
		@apply flex w-full relative;

		input, textarea {
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

		input:read-only, textarea:read-only {
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
			@apply text-zinc-500 left-4 top-1/2 -translate-y-1/2;
		}

		&:has(input:not(:placeholder-shown)), &:has(textarea:not(:placeholder-shown)),
		&:has(:focus) {
			.input__label {
				@apply top-4 text-xs;
			}
		}

		.icon {
			@apply w-5 h-5;
			@apply text-neutral-400 hover:cursor-pointer hover:text-neutral-100;
			@apply absolute left-3 -translate-y-1/2 top-1/2;
		}

		.password-icon {
			@apply size-6;
			@apply text-neutral-400 hover:cursor-pointer hover:text-neutral-100;
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
