<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { SaferwallClient } from '$lib/clients/saferwall';
	import Button from '$lib/components/form/Button.svelte';
	import type { Menu } from '$lib/types';
	import ButtonLike from '../form/ButtonLike.svelte';

	export let hash: string;
	export let client: SaferwallClient;
	export let liked = false;
	export let loggedIn = false;
	export let activeMenu: Menu.File;

	$: downloadLink = `${env.PUBLIC_API_URL}files/${hash}/download/`;
	$: shareTwitterLink = `https://twitter.com/intent/tweet?text=https://saferwall.com/files/${hash}/${activeMenu.path}`;

	let rescaning = false;
	const onRescanClick = async () => {
		rescaning = true;
		try {
			await client.rescanFile(hash);
		} catch (error) {
			console.error('Rescab failed', error);
		}
		window.location.reload();
	};
</script>

<section class="file__header no-scroll-style">
	<div class="flex items-end justify-between space-x-12">
		<h1 class="text-3xl font-semibold flex-shrink-0">
			<span class="sr-only">File {hash}</span>
			{activeMenu.fullName || activeMenu.name}
		</h1>

		<div class="space-x-2 flex flex-shrink-0">
			<Button size="lg" icon="download" href={downloadLink}>
				<span class="hidden md:block pl-2">Download file</span>
			</Button>
			<Button
				size="lg"
				icon="rescan"
				loading={rescaning}
				disabled={rescaning}
				on:click={onRescanClick}
			>
				<span class="hidden md:block pl-2">Rescan</span>
			</Button>
			<ButtonLike size="lg" {hash} {loggedIn} {liked} />
			<Button target="_blank" size="lg" icon="twitter" href={shareTwitterLink}>
				<span class="hidden md:block pl-2">Share</span>
			</Button>
		</div>
	</div>
</section>

<style lang="scss">
	:global(.file__header .button) {
		@apply border-none space-x-0;
	}

	.file__header {
		@apply container mx-auto pt-6 pb-2 overflow-x-auto mb-2;
		@apply text-neutral-100;
	}
</style>
