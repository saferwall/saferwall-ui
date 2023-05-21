<script lang="ts">
	import Loading from './Loading.svelte';

	let cclass: string = '';
	export let size: string = 'base';
	export let theme: string = 'base';
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let icon: string | undefined = undefined;
	export let target: string | undefined = undefined;
	export let href: string | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' | undefined = 'button';
	export { cclass as class };
</script>

{#if href}
	<a on:mouseup {href} {target} class="button button--{theme} button--size--{size} {cclass}">
		{#if icon}<svg class="icon"><use href="/images/icons.svg#icon-{icon}" /></svg>{/if}
		<Loading {loading}><slot /></Loading>
	</a>
{:else}
	<button
		on:mouseup
		{type}
		disabled={loading || disabled}
		class="button button--{theme} button--size--{size} {cclass}"
	>
		{#if icon}
			<svg class="icon"><use href="/images/icons.svg#icon-{icon}" /></svg>
		{/if}
		<Loading {loading}>
			<slot />
		</Loading>
		{#if loading}
			<slot name="loading" />
		{/if}
	</button>
{/if}

<style lang="scss">
	.button {
		@apply py-2.5 px-4;
		@apply font-semibold;
		@apply inline-flex justify-center items-center space-x-4;
		@apply border rounded;

		&--base {
			@apply text-primary bg-white;
		}
		&--gray {
			@apply text-grayx-500 bg-white;
		}
		&--base.active,
		&--base:hover,
		&--primary {
			@apply bg-primary text-white border-primary;

			&.light {
				@apply bg-primary-200 text-primary bg-opacity-30 border-transparent;
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
