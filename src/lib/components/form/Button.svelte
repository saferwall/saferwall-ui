<script lang="ts">
	export let theme: string = 'base';
</script>

<button class="button button--{theme}">
	<slot />
</button>

<style lang="scss">
	.button {
		@apply font-semibold;
		@apply py-2.5 px-5;
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
	}
</style>
