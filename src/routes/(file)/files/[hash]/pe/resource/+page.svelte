<script lang="ts">
	import type { PageData } from './$types';
	import DirectoryRoot from './components/DirectoryRoot.svelte';

	export let data: PageData;

	$: resource = (data as any).resource;
</script>

<article class="overflow-auto">
	<h1 class="title">Resource</h1>
	<div class="pr-4">
		<DirectoryRoot isRoot={true} {...resource} />
	</div>
</article>
