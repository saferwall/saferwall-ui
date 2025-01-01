<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { SaferwallClient } from '$lib/clients/saferwall';
	import Button from '$lib/components/form/Button.svelte';
	import type { Menu } from '$lib/types';
	import ButtonLike from '../form/ButtonLike.svelte';
	import { goto } from '$app/navigation';
	import Icon from '../Icon.svelte';
	import { onMount } from 'svelte';
	import CopyPopup from './CopyPopup.svelte';
	import { page } from '$app/stores';
	import { titleExtraStore } from '$lib/utils/fileMenu';

	export let hash: string;
	export let behaviorId: string | null;
	export let client: SaferwallClient;
	
	export let liked = false;
	export let loggedIn = false;
	export let activeMenu: Menu.File;

	$: downloadLink = `${env.PUBLIC_API_URL}files/${hash}/download/`;
	$: shareTwitterLink = `https://twitter.com/intent/tweet?text=https://saferwall.com/files/${hash}/${activeMenu.path}`;

	let rescaning = false;
	let downloadLoading = false;
	const onRescanClick = async () => {
		rescaning = true;
		try {
			await client.rescanFile(hash);
		} catch (error) {
			console.error('Rescab failed', error);
			// @ts-ignore
			if (error.status === 401) {
				goto("/auth/login");
				return;
			}
		}
		window.location.reload();
	};
</script>

<section class="file__header no-scroll-style">
	<div class="flex items-end justify-between space-x-12">
		<div class="flex flex-col min-w-0">
			<h1 class="text-xl font-semibold">
				{activeMenu.fullName || activeMenu.name}
				<span class="text-lg text-secondary-text">{$titleExtraStore}</span>
			</h1>
			<h2 class="block relative min-w-0 overflow-visible h-[1lh]">
				<CopyPopup value={hash} copiedText="Hash Copied !" class="w-full text-secondary-text" popupClass="w-[80%]" popupPosition="right"/>
			</h2>
		</div>

		<div class="space-x-2 flex flex-shrink-0">
			{#if $page.route.id === "/(file)/files/[hash]/api-calls" && behaviorId}
				<Button icon="export-api-logs" href="{env.PUBLIC_ARTIFACTS_URL}{hash}/{behaviorId}/api_trace.json"
					class="bg-secondary-surface hover:bg-brand-CF-light-surface hover:text-brand-light-text">
					<span class="hidden lg:block pl-2">Export API Logs</span>
				</Button>
			{/if}
			<Button class="bg-secondary-surface hover:bg-brand-CF-light-surface hover:text-brand-light-text" size="lg" loading={downloadLoading} icon="download" href={downloadLink} on:click={(e) => {
				e.preventDefault();
				downloadLoading = true;
				if (!client.authorization) {
					goto("/auth/login");
					return;
				}
				window.fetch(downloadLink, {
					headers: {
						"Authorization": client.authorization,
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
				<span class="hidden lg:block pl-2">Download file</span>
			</Button>
			<Button
				class="bg-secondary-surface hover:bg-brand-CF-light-surface hover:text-brand-light-text"
				size="lg"
				icon="rescan"
				loading={rescaning}
				disabled={rescaning}
				on:click={onRescanClick}
			>
				<span class="hidden lg:block pl-2">Rescan</span>
			</Button>
			<ButtonLike class="{liked ? "bg-brand-surface hover:bg-brand-500" : "bg-secondary-surface hover:bg-brand-CF-light-surface hover:text-brand-light-text "}" size="lg" {hash} {loggedIn} bind:liked />
			<Button class="bg-secondary-surface hover:bg-brand-CF-light-surface hover:text-brand-light-text" target="_blank" size="lg" icon="x-logo" href={shareTwitterLink}>
				<span class="hidden lg:block pl-2">Share</span>
			</Button>
		</div>
	</div>
</section>

<style lang="postcss">
	:global(.file__header .button) {
		@apply border-none space-x-0;
	}

	.file__header {
		@apply pt-6 pb-2 mb-2;
		@apply text-neutral-100;
	}
</style>
