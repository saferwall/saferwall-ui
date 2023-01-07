<script lang="ts">
	export let size: string = 'base';
	export let theme: string = 'base';
	export let href: string | undefined = undefined;
</script>

{#if href}
	<a {href} class="button button--{theme} button--size--{size}">
		<slot />
	</a>
{:else}
	<button class="button button--{theme} button--size--{size}">
		<slot />
	</button>
{/if}

<style lang="scss">
	.button {
		@apply py-2.5 px-5;
		@apply font-semibold;
		@apply inline-flex justify-center items-center;
		@apply border rounded min-w-[100px];

		&--base {
			@apply text-primary bg-white;
		}
		&--base:hover,
		&--primary {
			@apply bg-primary text-white border-primary;
		}

		&--primary:hover {
			@apply bg-opacity-90 border-opacity-90;
		}

		&--size {
			&--large {
				@apply py-3 px-7;
			}
		}
	}
</style>
