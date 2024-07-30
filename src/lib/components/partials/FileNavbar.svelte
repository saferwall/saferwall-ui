<script lang="ts">
	import type { Menu } from '$lib/types';

	export let hash = '';
	export let activeFileMenu: Menu.File[] = [];
	export let activeMenu: { name: string; path: string };

	$: isPathActive = (path: string): boolean => path === activeMenu.path;
	$: generateFilePath = (path: string): string => `/files/${hash}/${path}`;
</script>

<section
	data-sveltekit-preload-data="tap"
	class="file__navbar bg-white dark:bg-transparent border-t border-primary-100 dark:border-none border-opacity-20 z-10 w-full sticky top-0 overflow-x-auto no-scroll-style"
>
	<div class="w-full container mx-auto flex">
		<ul class="file__navbar__menu flex w-full space-x-3">
			<li class="file__navbar__item flex-grow inline-flex">
				<a
					class="file__navbar__link text-primary bg-primary/5 hover:bg-primary hover:text-white"
					href="/"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
						<use href="/images/icons.svg#icon-cloud" />
					</svg>
					<span>Upload file</span>
				</a>
			</li>
			{#each activeFileMenu as item}
				<li class="file__navbar__item">
					<a
						class="file__navbar__link"
						class:active={isPathActive(item.path)}
						href={generateFilePath(item.path)}>{item.name}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="postcss">
	.file__navbar {
		@apply py-4;

		&__item {
			@apply flex-shrink-0;
		}

		&__link {
			@apply transition-all duration-200 ease-in-out;
			@apply flex items-center space-x-2 w-auto text-neutral-400;
			@apply p-2.5 px-5 rounded-full font-medium;
		}

		&__link:hover,
		&__link.active {
			@apply bg-primary/90 active:bg-primary text-white;
		}
	}
</style>
