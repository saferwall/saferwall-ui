<script lang="ts">
	import type { LayoutData } from './$types';
	import FileNavbar from '$lib/components/partials/FileNavbar.svelte';
	import FileHeading from '$lib/components/partials/FileHeading.svelte';
	import { fileMenuStore } from '$lib/utils/fileMenu';

	export let data: LayoutData;

	$: hash = data.hash;
	$: client = data.client;
	$: activeMenu = data.activeMenu;
	$: loggedIn = data.user !== undefined;
</script>

<svelte:head>
	<title>{activeMenu.name} - {hash} - Saferwall Beta 1.0</title>
	<meta name="description" content="Scan results for file hash {hash}." />
</svelte:head>

<FileNavbar {hash} {activeMenu} activeFileMenu={$fileMenuStore} {loggedIn} {client} />
<main class="flex-1 flex flex-col h-full bg-background">
	<FileHeading {client} {activeMenu} {hash} {loggedIn}
	/>
	<!-- {liked}  -->
	<div class="flex flex-col flex-1 pt-4 pb-10">
		<slot />
	</div>
</main>
