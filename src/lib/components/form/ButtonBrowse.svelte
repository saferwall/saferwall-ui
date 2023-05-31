<script>
	import Button from './Button.svelte';
</script>

<Button {...$$props} theme="primary" size="lg" on:mouseup>
	<span>Browse files</span>
	<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8">
		<use href="/images/icons.svg#icon-cloud" />
	</svg>
</Button>

<style>
	:global(.button) {
		@apply space-x-2;
	}
</style>
