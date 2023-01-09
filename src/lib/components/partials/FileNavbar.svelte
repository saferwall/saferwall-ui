<script lang="ts">
	import { fileMenu } from '$lib/data/menus';

	export let hash = '';
	export let activeMenu: { name: string; path: string };

	$: isActivePath = (path: string): boolean => path === activeMenu.path;
	$: applyFilePath = (path: string): string => `/files/${hash}/${path}`;
</script>

<section
	data-sveltekit-preload-data="tap"
	class="fnavbar z-10 w-full sticky top-0 bg-white overflow-x-auto"
>
	<div class="w-full container mx-auto flex">
		<ul class="fnavbar__menu flex w-full space-x-3">
			<li class="fnavbar__item flex-grow inline-flex">
				<a class="fnavbar__link" href="/">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
						<use href="/images/images.svg#icon-cloud" />
					</svg>
					<span>Browse file</span>
				</a>
			</li>
			{#each fileMenu as menu}
				<li class="fnavbar__item">
					<a
						class="fnavbar__link"
						class:active={isActivePath(menu.path)}
						href={applyFilePath(menu.path)}>{menu.name}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="scss">
	.fnavbar {
		@apply py-4;
		@apply border-b border-gray-400 border-opacity-20;

		&__item {
			@apply flex-shrink-0;
		}

		&__link {
			@apply transition-all duration-200 ease-in-out;
			@apply flex items-center space-x-2 w-auto text-grayx-500;
			@apply p-2.5 px-5 rounded-full font-medium;
		}

		&__link:hover,
		&__link.active {
			@apply bg-primary text-white;
		}
	}
</style>
