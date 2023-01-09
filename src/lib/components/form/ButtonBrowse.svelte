<script>
	import Button from './Button.svelte';
</script>

<Button theme="primary" size="large">
	<span>Browse files</span>
	<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8">
		<use href="/images/images.svg#icon-cloud" />
	</svg>
</Button>

<style>
	:global(.button) {
		@apply space-x-2;
	}
</style>
