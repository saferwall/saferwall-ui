<script lang="ts">
	import type { PageData } from './$types';
	import FileNavbar from '$lib/components/partials/FileNavbar.svelte';
	import FileHeading from '$lib/components/partials/FileHeading.svelte';

	export let data: PageData;

	const { hash, file } = data;
	const { submissions } = file;

	$: activeMenu = data.activeMenu;
	$: fileName = submissions[submissions.length - 1].filename;
</script>

<svelte:head>
	<title>{fileName} - {activeMenu.name} - {hash} - Saferwall</title>
	<meta name="description" content="{fileName} file scan - hash {hash}" />
</svelte:head>

<FileNavbar {hash} {activeMenu} />
<main class="flex-1 flex flex-col h-full bg-grayx">
	<FileHeading {activeMenu} {hash} />
	<div class="py-12">
		<slot />
	</div>
</main>
