<script lang="ts">
	import Loading from './Loading.svelte';
	import { twMerge } from 'tailwind-merge';

	let Class = "";
	export { Class as class };
	export let loading = false;
	export let disabled = false;
	export let icon: string | undefined = undefined;
	export let href: string | undefined = undefined;
	export let target: string | undefined = undefined;
	export let size: 'base' | 'xss' | 'xs' | 'sm' | 'md' | 'lg' = 'base';
	export let theme: 'base' | 'gray' | 'primary' | 'danger' = 'base';
	export let type: 'button' | 'submit' | 'reset' | undefined = 'button';
</script>

{#if href}
	<a
		on:click
		{...$$props}
		{href}
		{target}
		class="button button--{theme} button--size--{size} {twMerge($$props.class, Class)}"
	>
		<Loading {loading}>
			<div class="content">
				{#if icon}
					<svg class="icon" class:opacity-0={loading}
						><use href="/images/icons.svg#icon-{icon}" /></svg
					>{/if}
				<slot />
			</div>
		</Loading>
	</a>
{:else}
	<button
		on:click
		{...$$props}
		{type}
		disabled={loading || disabled}
		class="button button--{theme} button--size--{size} {twMerge($$props.class, Class)}"
	>
		<Loading {loading}>
			<div class="content">
				{#if icon}
					<svg class="icon" class:opacity-0={loading}
						><use href="/images/icons.svg#icon-{icon}" /></svg
					>
				{/if}
				<slot />
				{#if loading}
					<slot name="loading" />
				{/if}
			</div>
		</Loading>
	</button>
{/if}

<style lang="postcss">
	.button {
		@apply py-2.5 px-4;
		@apply font-semibold;
		@apply border rounded;

		&,
		.content {
			@apply inline-flex justify-center items-center space-x-4;
		}

		&--base {
			@apply text-primary bg-white;
		}
		&--gray {
			@apply text-neutral-500 bg-white;
		}
		&--base.active,
		&--base:hover,
		&--primary {
			@apply bg-primary text-white border-primary;

			&.light {
				@apply bg-primary-100 text-primary bg-opacity-50 border-transparent;
			}
		}

		&--gray.active,
		&--gray:hover {
			@apply text-primary;
		}

		&--primary.active,
		&--primary:hover {
			@apply bg-opacity-90 border-opacity-90;
		}

		&--danger {
			@apply bg-red-500 text-white border-red-500;
			@apply focus:outline-red-500 hover:outline-red-500 hover:bg-opacity-95;

			&.light {
				@apply bg-red-200 text-red-500 bg-opacity-30 border-transparent;
			}
		}

		&--size {
			&--xss {
				@apply text-xs py-2;
			}
			&--xs {
				@apply text-xs py-2;
			}
			&--sm {
				@apply py-2 text-sm;
			}
			&--md {
				@apply py-2.5 text-sm;
			}
			&--lg {
				@apply py-3 px-5;
			}
		}

		&:disabled {
			@apply bg-opacity-60 border-opacity-5;
		}

		.icon {
			@apply w-4 h-4;
		}
	}
</style>
