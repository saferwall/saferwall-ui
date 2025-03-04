<script lang="ts">
	import type { Menu } from '$lib/types';
	import { page } from '$app/stores';
	import type { SaferwallClient } from '$lib/clients/saferwall';
	import UploadBox from '../UploadBox.svelte';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	export let client: SaferwallClient;
	export let loggedIn = false;
	export let hash = '';
	export let activeFileMenu: Menu.File[] = [];
	export let activeMenu: { name: string; path: string };

	let strip: boolean = getContext("strip");

	$: isPathActive = (path: string): boolean => path === activeMenu.path;
	$: generateFilePath = (path: string): string => `/files/${hash}/${path}`;
	let uploadOpen = false;
	let uploadBox: HTMLElement;
</script>

<section
	data-sveltekit-preload-data="tap"
	class="file__navbar bg-secondary-surface border-primary-100 dark:border-none border-opacity-20 z-10 w-full sticky top-[-1px] overflow-x-auto no-scroll-style px-4"
>
	<div class="w-full container mx-auto flex">
		<ul class="file__navbar__menu flex w-full space-x-3">
			{#if !strip}
				<li class="file__navbar__item flex-grow inline-flex ">
					<!-- {#if loggedIn}
						<button
							class="file__navbar__link upload-file
								text-brand			hover:text-brand-light-text
								bg-brand-CF-surface	hover:bg-brand-CF-lighter-surface
								"
							on:click={(e) => {
								if (!uploadOpen)
									window.scrollTo({top: 0});
								uploadOpen = !uploadOpen;
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
								<use href="/images/icons.svg#icon-cloud" />
							</svg>
							<span>Upload file</span>
						</button>
					{:else} -->
						<button
							class="file__navbar__link upload-file
								text-brand			hover:text-brand-light-text
								bg-brand-CF-surface	hover:bg-brand-CF-lighter-surface
								"
							role={loggedIn ? "button" : "link"}
							on:click={(e) => {
								if (loggedIn) {
									e.preventDefault();
									if (!uploadOpen)
										window.scrollTo({top: 0});
									uploadOpen = !uploadOpen;
								} else {
									goto(`/auth/login?redir=${encodeURIComponent($page.url.pathname)}`);
								}
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
								<use href="/images/icons.svg#icon-cloud" />
							</svg>
							<span>Upload file</span>
						</button>
					<!-- {/if} -->
				</li>
			{/if}
			{#each activeFileMenu as item}
				<li class="file__navbar__item">
					<a
						class="file__navbar__link"
						class:active={isPathActive(item.path)}
						href={new URL(generateFilePath(item.path) + `?behavior_id=${$page.url.searchParams.get("behavior_id")}`, $page.url.href).toString()}>{item.name}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</section>
<div class="transition-[max-height] bg-neutral-600 overflow-y-hidden" style="max-height: {uploadOpen ? "1000px" : "0px"} !important" bind:this={uploadBox}>
	<UploadBox {loggedIn} {client} />
</div>

<style lang="postcss">
	.file__navbar {
		@apply py-4;
		
		&__item {
			@apply flex-shrink-0;
			&:first-child {
				.file__navbar__link.upload-file {
					@apply rounded;
				}
			}
		}

		&__link {
			@apply flex items-center space-x-2 w-auto text-secondary-text;
			@apply p-2.5 px-5 rounded-full font-medium;
			/* @apply transition-colors duration-200 ease-in-out; */
		}
		&__link:hover {
			@apply text-brand-400 dark:text-gray-100;
		}
		&__link.active {
			@apply text-gray-100;
		}
		&__link.active {
			@apply bg-primary text-white;
		}
	}
</style>
