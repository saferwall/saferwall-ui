<script lang="ts">
	import Loading from './Loading.svelte';
	import { twMerge } from 'tailwind-merge';

	let Class = "";
	export { Class as class };
	export let loading = false;
	export let disabled = false;
	export let iconClass = "";
	export let icon: string | undefined = undefined;
	export let href: string | undefined = undefined;
	export let target: string | undefined = undefined;
	export let size: 'base' | 'xss' | 'xs' | 'sm' | 'md' | 'lg' = 'base';
	export let theme: 'base' | 'gray' | 'brand' | 'danger' | "none" = 'base';
	export let type: 'button' | 'submit' | 'reset' | undefined = 'button';
	export let This: HTMLElement | undefined = undefined;
</script>

{#if href}
	<a
		on:click
		bind:this={This}
		{...$$props}
		{href}
		{target}
		class="button button--{theme} button--size--{size} {twMerge($$props.class, Class)}"
	>
		<Loading {loading}>
			<div class="content">
				{#if icon}
					<svg class="{twMerge("size-4", iconClass)}" class:opacity-0={loading}
						><use href="/images/icons.svg#icon-{icon}" /></svg
					>{/if}
				<slot />
			</div>
		</Loading>
	</a>
{:else}
	<button
		on:click
		bind:this={This}
		{...$$props}
		{type}
		disabled={loading || disabled}
		class="button button--{theme} button--size--{size} {twMerge($$props.class, Class)}"
	>
		<Loading {loading}>
			<div class="content">
				{#if icon}
					<svg class="{twMerge("size-4", iconClass)}" class:opacity-0={loading}
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
		@apply font-medium;
		@apply border rounded;

		&,
		.content {
			@apply inline-flex justify-center items-center space-x-4;
		}

		/**
		 * Base Theme
		 */
		&,
		&--base {
			@apply text-brand bg-transparent border-neutral-700;
		}

		&.active,
		&:hover,
		&--base.active,
		&--base:hover {
			@apply bg-brand-300 border-brand-300;
		}

		/**
		 * Brand Theme
		 */
		&--brand {
			@apply bg-brand-200 border-brand-200 text-white;
		}

		&--brand.active,
		&--brand:hover {
			@apply bg-brand-100 border-brand-100;
		}

		&--danger {
			@apply bg-red-500 hover:bg-red-600 text-white border-red-500;
			@apply focus:outline-red-500 hover:outline-red-500 hover:bg-opacity-95;
		}

		&--none {
			@apply bg-transparent hover:bg-transparent;
		}
		&--size {
			&--xss {
				@apply text-xs py-2;
			}
			&--xs {
				@apply text-xs py-2;
			}
			&--sm {
				@apply py-2 text-xs;
			}
			&--md {
				@apply py-2.5 text-xs;
			}
			&--lg {
				@apply py-3 px-5;
			}
		}

		&:disabled {
			@apply bg-opacity-60 border-opacity-5 cursor-not-allowed;
		}

	}
</style>
