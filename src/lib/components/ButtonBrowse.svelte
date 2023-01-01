<script>
	import Button from './form/Button.svelte';
</script>

<Button theme="primary" size="large">
	<span>Browse files</span>
	<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 32 27">
		<path
			stroke="#fff"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M21.17 18.67 16 13.5l-5.17 5.17M16 13.5v11.63"
		/>
		<path
			stroke="#fff"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M26.84 21.75a6.46 6.46 0 0 0-3.09-12.13h-1.63a10.33 10.33 0 1 0-17.75 9.43"
		/>
		<path
			stroke="#fff"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M21.17 18.67 16 13.5l-5.17 5.17"
		/>
	</svg>
</Button>

<style>
	:global(.button) {
		@apply space-x-2;
	}
</style>
