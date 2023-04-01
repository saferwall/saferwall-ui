<script lang="ts">
	import type { FileMenu } from '$lib/types';
	import Button from '$lib/components/form/Button.svelte';

	export let hash = '';
	export let activeMenu: FileMenu;

	$: downloadLink = `https://api.saferwall.com/v1/files/${hash}/download/`;
	$: shareTwitterLink = `https://twitter.com/intent/tweet?text=https://saferwall.com/file/${hash}/${activeMenu.path}`;
</script>

<section class="fheading container mx-auto pt-6 pb-2 overflow-x-auto mb-2 no-scroll-style">
	<div class="flex items-end justify-between space-x-12">
		<h1 class="text-3xl font-semibold flex-shrink-0">
			<span class="sr-only">File {hash}</span>
			{activeMenu.fullName || activeMenu.name}
		</h1>

		<div class="space-x-2 flex flex-shrink-0">
			<Button href={downloadLink} size="lg" icon="download">
				<span class="hidden md:block pl-2">Download file</span></Button
			>
			<Button size="lg" icon="rescan">
				<span class="hidden md:block pl-2">Rescan file</span>
			</Button>
			<Button size="lg" icon="like">
				<span class="hidden md:block pl-2">Like</span>
			</Button>
			<Button href={shareTwitterLink} target="_blank" size="lg" icon="twitter">
				<span class="hidden md:block pl-2">Share</span></Button
			>
		</div>
	</div>
</section>

<style lang="scss">
	:global(.fheading .button) {
		@apply shadow-base border-none space-x-0;
	}
</style>
