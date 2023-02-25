<script lang="ts">
	import type { PageData } from './$types';
	import BaseCard from '$lib/components/cards/BaseCard.svelte';

	export let data: PageData;

	$: activeMenu = data.activePEMenu;
	$: menus = [
		{ field: 'dos_header', path: 'dos-header', title: 'DOS Header' },
		{ field: 'nt_header', path: 'nt-header', title: 'NT Header' },
		{ field: 'rich_header', path: 'rich-header', title: 'Rich Header' },
		{ field: 'sections', path: 'sections', title: 'Sections' },
		{ field: 'export', path: 'export', title: 'Export' },
		{ field: 'import', path: 'imports', title: 'Imports' },
		{ field: 'resources', path: 'resources', title: 'Resources' },
		{ field: 'exceptions', path: 'exceptions', title: 'Exceptions' },
		{ field: 'security', path: 'certificate', title: 'Certificate' },
		{ field: 'reloc', path: 'relocations', title: 'Relocations' },
		{ field: 'debug', path: 'debugs', title: 'Debugs' },
		{ field: 'tls', path: 'tls', title: 'TLS' },
		{ field: 'load_config', path: 'load-config', title: 'Load config' },
		{ field: 'bound_imports', path: 'bound-imports', title: 'Bound imports' },
		{ field: 'iat', path: 'iat', title: 'IAT' },
		{ field: 'delay_import', path: 'delay-imports', title: 'Delay import' },
		{ field: 'clr', path: 'clr', title: 'CLR' }
	].filter(({ field }) => data.file.pe?.meta.includes(field));
</script>

<div class="files__layout container mx-auto w-full h-full items-center justify-center">
	<BaseCard class="flex flex-col md:flex-row space-x-4" flex={false} padding={false}>
		<ul>
			{#each menus as item}
				<li><a class:active={item.path === activeMenu} href={item.path}>{item.title}</a></li>
			{/each}
		</ul>
		<div class="w-full h-full overflow-x-auto py-4">
			<slot />
		</div>
	</BaseCard>
</div>

<style lang="scss">
	ul {
		@apply flex flex-row md:flex-col shrink-0 md:p-4 overflow-y-auto;

		li {
			@apply shrink-0;

			a {
				@apply font-medium text-gray-400;
				@apply block py-4 pl-4 pr-10 border-b md:border-b-0 border-r md:rounded-l;

				&.active,
				&:hover {
					@apply bg-primary-100 bg-opacity-20 text-primary relative;

					&:after {
						@apply md:content-[''] md:border-r-4 border-primary h-full md:absolute md:-right-1 md:top-0;
					}
				}
			}
		}
	}

	.files__layout {
		@apply text-sm;
	}

	.files__layout :global(table thead) {
		@apply text-left;
	}

	.files__layout :global(table thead th) {
		@apply py-6 font-medium;
	}
	.files__layout :global(table tr td) {
		@apply py-2 text-gray-800;
	}

	.files__layout :global(.title) {
		@apply text-2xl font-semibold;
	}
</style>
