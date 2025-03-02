<script lang="ts">
	import FileNavbar from '$lib/components/partials/FileNavbar.svelte';
	import FileHeading from '$lib/components/partials/FileHeading.svelte';
	import { fileMenuStore } from '$lib/utils/fileMenu';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { getContext } from 'svelte';

	export let data: LayoutData;

	$: hash = data.hash;
	$: client = data.client;
	$: activeMenu = data.activeMenu;
	$: loggedIn = data.user !== undefined;
	$: behaviorId = $page.url.searchParams.get("behavior_id");
</script>

<svelte:head>
	<title>{activeMenu.name} - {hash} - Saferwall 1.0</title>
	<meta name="description" content="Scan results for file hash {hash}." />
</svelte:head>

<FileNavbar {hash} {activeMenu} activeFileMenu={$fileMenuStore} {loggedIn} {client} />
<main class="h-full flex flex-col items-center bg-background lg:px-12 px-4">
	<div class="container flex-1 flex flex-col">
		<FileHeading {client} {activeMenu} {hash} {behaviorId} {loggedIn}
		/>
		<!-- {liked}  -->
		<div class="flex flex-col flex-1 pt-4 pb-10">
			<slot />
		</div>
	</div>
</main>
