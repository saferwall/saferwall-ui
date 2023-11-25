<script lang="ts">
	import type { Saferwall, Menus } from '$lib/types';
	import Button from '$lib/components/form/Button.svelte';
	import ButtonLike from '../form/ButtonLike.svelte';
	import { SaferwallClient } from '$lib/clients/saferwall';

	export let hash = '';
	export let liked = false;
	export let loggedIn = false;
	export let activeMenu: Menus.File;
	export let session: Saferwall.Session;

	$: downloadLink = `https://api.saferwall.com/v1/files/${hash}/download/`;
	$: shareTwitterLink = `https://twitter.com/intent/tweet?text=https://saferwall.com/file/${hash}/${activeMenu.path}`;

	let rescaning = false;
	const onRescanMouseUp = async () => {
		rescaning = true;
		try {
			await new SaferwallClient(session).rescanFile(hash);
			window.location.reload();
		} catch (error) {}
		rescaning = false;
	};
</script>

<section class="file-header no-scroll-style">
	<div class="flex items-end justify-between space-x-12">
		<h1 class="text-3xl font-semibold flex-shrink-0">
			<span class="sr-only">File {hash}</span>
			{activeMenu.fullName || activeMenu.name}
		</h1>

		<div class="space-x-2 flex flex-shrink-0">
			<Button size="lg" icon="download" href={downloadLink}>
				<span class="hidden md:block pl-2">Download file</span></Button
			>
			<Button
				size="lg"
				icon="rescan"
				loading={rescaning}
				disabled={rescaning}
				on:mouseup={onRescanMouseUp}
			>
				<span class="hidden md:block pl-2">Rescan file</span>
			</Button>
			<ButtonLike size="lg" {hash} {loggedIn} {liked} />
			<Button target="_blank" size="lg" icon="twitter" href={shareTwitterLink}>
				<span class="hidden md:block pl-2">Share</span>
			</Button>
		</div>
	</div>
</section>

<style lang="scss">
	:global(.file-header .button) {
		@apply shadow-base border-none space-x-0;
	}

	.file-header {
		@apply container mx-auto pt-6 pb-2 overflow-x-auto mb-2;
	}
</style>
