<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { SaferwallClient } from '$lib/clients/saferwall';
	import Button from '$lib/components/form/Button.svelte';
	import type { Menu } from '$lib/types';
	import ButtonLike from '../form/ButtonLike.svelte';
	import { goto } from '$app/navigation';
	import Icon from '../Icon.svelte';
	import { onMount } from 'svelte';

	export let hash: string;
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

	function hideElement(el: HTMLElement) {
		el.classList.add("hidden");
		el.classList.remove("flex");
	}

	function showElement(el: HTMLElement) {
		el.classList.remove("hidden");
		el.classList.add("flex");
	}

	let popup: HTMLElement;
	let hashCopied: HTMLElement;
	let hashCopiedTimeout: number;

	onMount(() => {
		let listener = (event: MouseEvent) => {
			console.log({popup, event, target: event.target})
			if (!popup.contains((event.target as HTMLElement))) {
				hideElement(popup);
			}
		};
		window.addEventListener("click", listener, {
			capture: true,
		});
		return () => {
			window.removeEventListener("click", listener);
		}
	})
</script>

<section class="file__header no-scroll-style">
	<div class="flex items-end justify-between space-x-12">
		<div class="flex flex-col min-w-0">
			<h1 class="text-3xl font-semibold">
				{activeMenu.fullName || activeMenu.name}
			</h1>
			<h2 class="block relative min-w-0 overflow-visible h-[1lh]">
				<button class="border-none text-secondary-text text-ellipsis whitespace-nowrap overflow-hidden hover:text-brand-text w-full" on:click={() => {
					hideElement(hashCopied);
					showElement(popup);
				}}>
					{hash}
				</button>
				<div bind:this={popup} class="absolute z-[1] right-0 top-[calc(100%+0.5rem)] w-[80%] hidden flex-col items-end gap-2">
					<div class="main flex gap-2 p-4 text-primary-text bg-hash-surface rounded-base border border-secondary-border shadow-[0px_2px_13px_0px_rgba(0,0,0,0.1)] w-full">
						<div class="break-words min-w-0">{hash}</div>
						<button class="flex-shrink-0 p-1 flex h-fit border-none" on:click={() => {
							clearTimeout(hashCopiedTimeout);
							showElement(hashCopied);
							navigator.clipboard.writeText(hash);
							hashCopiedTimeout = window.setTimeout(() => hideElement(hashCopied), 1000)
						}}>
							<svg name="content-copy" class="text-brand-text" width="20" height="20">
								<use href="/images/icons.svg#icon-content-copy" />
							</svg>
						</button>
					</div>
					<div bind:this={hashCopied} class="hash-copied bg-[#56AC30] text-white min-w-0 hidden items-center rounded-[6px] gap-1 p-[10px]">
						<Icon name="check-circle"></Icon>
						Hash copied !
					</div>
				</div>
			</h2>
		</div>

		<div class="space-x-2 flex flex-shrink-0">
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
				<span class="hidden md:block pl-2">Download file</span>
			</Button>
			<Button
				class="bg-secondary-surface hover:bg-brand-CF-light-surface hover:text-brand-light-text"
				size="lg"
				icon="rescan"
				loading={rescaning}
				disabled={rescaning}
				on:click={onRescanClick}
			>
				<span class="hidden md:block pl-2">Rescan</span>
			</Button>
			<ButtonLike class="{liked ? "bg-brand-surface hover:bg-brand-500" : "bg-secondary-surface hover:bg-brand-CF-light-surface hover:text-brand-light-text "}" size="lg" {hash} {loggedIn} bind:liked />
			<Button class="bg-secondary-surface hover:bg-brand-CF-light-surface hover:text-brand-light-text" target="_blank" size="lg" icon="twitter" href={shareTwitterLink}>
				<span class="hidden md:block pl-2">Share</span>
			</Button>
		</div>
	</div>
</section>

<style lang="postcss">
	:global(.file__header .button) {
		@apply border-none space-x-0;
	}

	.file__header {
		@apply container mx-auto pt-6 pb-2 mb-2;
		@apply text-neutral-100;
	}
</style>
