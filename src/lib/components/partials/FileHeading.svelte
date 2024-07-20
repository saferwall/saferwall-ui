<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { SaferwallClient } from '$lib/clients/saferwall';
	import Button from '$lib/components/form/Button.svelte';
	import type { Menu, Saferwall } from '$lib/types';
	import ButtonLike from '../form/ButtonLike.svelte';
	import { goto } from '$app/navigation';

	export let hash: string;
	export let liked = false;
	export let loggedIn = false;
	export let activeMenu: Menu.File;
	export let session: Saferwall.Session | undefined;

	$: downloadLink = `${env.PUBLIC_API_URL}files/${hash}/download/`;
	$: shareTwitterLink = `https://twitter.com/intent/tweet?text=https://saferwall.com/files/${hash}/${activeMenu.path}`;

	let rescaning = false;
	let downloadLoading = false;
	const onRescanClick = async () => {
		rescaning = true;
		try {
			await new SaferwallClient(session).rescanFile(hash);
		} catch (error) {
			console.error('Rescab failed', error);
			// @ts-ignore
			if (error.status === 401) {
				location.href = "/auth/login";
				return;
			}
		}
		window.location.reload();
	};
</script>

<section class="file-header no-scroll-style">
	<div class="flex items-end justify-between space-x-12">
		<h1 class="text-3xl font-semibold flex-shrink-0">
			<span class="sr-only">File {hash}</span>
			{activeMenu.fullName || activeMenu.name}
		</h1>

		<div class="space-x-2 flex flex-shrink-0">
			<Button size="lg" loading={downloadLoading} icon="download" href={downloadLink} on:click={(e) => {
				e.preventDefault();
				downloadLoading = true;
				if (!session || !session.token) {
					goto("/auth/login");
					return;
				}
				window.fetch(downloadLink, {
					headers: {
						"Authorization": `Bearer ${session.token}`,
						"Content-Type": "application/json"
					}
				}).then(res => {
					if (res.status === 401) {
						downloadLoading = false;
						goto("/auth/login");
						return;
					}
					return res.blob()
				}).then(blob => {
					if (!blob) return;
					downloadLoading = false;
					let file = URL.createObjectURL(blob);
					location.assign(file);
				});
			}}>
				<span class="hidden md:block pl-2">Download file</span></Button
			>
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

<style lang="postcss">
	:global(.file-header .button) {
		@apply shadow-base border-none space-x-0;
	}

	.file-header {
		@apply container mx-auto pt-6 pb-2 overflow-x-auto mb-2;
	}
</style>
