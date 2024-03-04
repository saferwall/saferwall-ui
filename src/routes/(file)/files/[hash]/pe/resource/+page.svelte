<script lang="ts">
	import type { PageData } from './$types';
	import DirectoryRoot from './components/DirectoryRoot.svelte';

	// TODO: allow to move table with mouse
	export let data: PageData;

	let { resource } = data;
	$: ({ resource } = data);
</script>

<article class="flex-1">
	<h1 class="title">Resource</h1>
	<section class="overflow-y-auto h-full relative">
		<DirectoryRoot isRoot={true} {...resource} />
	</section>
</article>
