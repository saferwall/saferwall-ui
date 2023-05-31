<script lang="ts">
	import type { LayoutData } from './$types';
	import FileNavbar from '$lib/components/partials/FileNavbar.svelte';
	import FileHeading from '$lib/components/partials/FileHeading.svelte';

	export let data: LayoutData;

	$: hash = data.hash;
	$: fileMenu = data.fileMenu;
	$: activeMenu = data.activeMenu;
	$: submissions = data.file.submissions;
	$: fileName = (submissions && submissions[submissions.length - 1].filename) || '';
	$: liked = data.file.liked;
	$: loggedIn = data.user !== undefined;
</script>

<svelte:head>
	<title>{fileName} - {activeMenu.name} - {hash} - Saferwall</title>
	<meta name="description" content="Scan results for file {fileName} hash {hash}." />
</svelte:head>

<FileNavbar {hash} {activeMenu} {fileMenu} />
<main class="flex-1 flex flex-col h-full bg-grayx">
	<FileHeading {activeMenu} {hash} {loggedIn} {liked} />
	<div class="pt-4 pb-10">
		<slot />
	</div>
</main>
