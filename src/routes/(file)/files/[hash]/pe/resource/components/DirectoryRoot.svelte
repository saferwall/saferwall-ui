<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import DirectoryEntry from './DirectoryEntry.svelte';

	export let Entries: Saferwall.Resource.Entry[];
</script>

<section class="py-4 space-y-4">
	<h3 class="text-lg font-semibold">Resource Directory</h3>
	<ul class="space-y-4">
		{#each Entries as entry}
			<li class="border border-graya rounded-lg shadow-sm py-2">
				<DirectoryEntry isRoot={true} {...entry} />
			</li>
		{/each}
	</ul>
</section>
