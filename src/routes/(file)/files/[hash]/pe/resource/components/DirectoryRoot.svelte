<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import DirectoryEntry from './DirectoryEntry.svelte';

	export let entries: Saferwall.Resource.Entry[];
</script>

<section class="p-4 space-y-4">
	<h3 class="text-lg font-semibold">Resource Directory</h3>
	<ul class="space-y-4">
		{#each entries as entry}
			<li class="border border-zinc-300 dark:border-zinc-700 rounded-lg py-2">
				<DirectoryEntry isRoot={true} {...entry} />
			</li>
		{/each}
	</ul>
</section>
