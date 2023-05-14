<script lang="ts">
	import type { PageData } from './$types';
	import FileNavbar from '$lib/components/partials/FileNavbar.svelte';
	import FileHeading from '$lib/components/partials/FileHeading.svelte';

	export let data: PageData;

	$: hash = data.hash;
	$: fileMenu = data.fileMenu;
	$: activeMenu = data.activeMenu;
	$: submissions = data.file.submissions;
	$: fileName = (submissions && submissions[submissions.length - 1].filename) || '';
</script>

<svelte:head>
	<title>{fileName} - {activeMenu.name} - {hash} - Saferwall</title>
	<meta name="description" content="Scan results for file {fileName} hash {hash}." />
</svelte:head>

<FileNavbar {hash} {activeMenu} {fileMenu} />
<main class="flex-1 flex flex-col h-full bg-grayx">
	<FileHeading {activeMenu} {hash} />
	<div class="pt-4 pb-10">
		<slot />
	</div>
</main>
