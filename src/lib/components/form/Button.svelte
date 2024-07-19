<script lang="ts">
	import Loading from './Loading.svelte';

	export let loading = false;
	export let disabled = false;
	export let icon: string | undefined = undefined;
	export let href: string | undefined = undefined;
	export let target: string | undefined = undefined;
	export let size: 'base' | 'xss' | 'xs' | 'sm' | 'md' | 'lg' = 'base';
	export let theme: 'base' | 'gray' | 'brand' | 'danger' = 'base';
	export let type: 'button' | 'submit' | 'reset' | undefined = 'button';
</script>

{#if href}
	<a
		on:click
		{...$$props}
		{href}
		{target}
		class="button button--{theme} button--size--{size} {$$props.class}"
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
		class="button button--{theme} button--size--{size} {$$props.class}"
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

<style lang="scss">
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
			@apply bg-brand-400 border-brand-400 text-white;
		}

		&--brand.active,
		&--brand:hover {
			@apply bg-brand-500 border-brand-500;
		}

		&--danger {
			@apply bg-red-500 text-white border-red-500;
			@apply focus:outline-red-500 hover:outline-red-500 hover:bg-opacity-95;
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
			@apply bg-opacity-60 border-opacity-5;
		}

		.icon {
			@apply w-4 h-4;
		}
	}
</style>
