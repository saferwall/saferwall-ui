<script>
	import Button from './Button.svelte';
</script>

<Button {...$$props} theme="brand" size="lg" on:click>
	<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
		<use href="/images/icons.svg#icon-cloud" />
	</svg>
	<span class="ml-2">Upload files</span>
</Button>
