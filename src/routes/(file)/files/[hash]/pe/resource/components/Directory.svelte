<script lang="ts">
	import type { Entry, Struct } from '$lib/types/resource';
	import DirectoryEntry from './DirectoryEntry.svelte';
	import ResourceData from './ResourceData.svelte';

	export let Entries: Entry[];
	export let Struct: Struct[];
</script>

{#if Entries}
	<ul class="space-y-4">
		{#each Entries as entry}
			<li>
				<DirectoryEntry {...entry} />
			</li>
		{/each}
	</ul>
{:else}
	<ResourceData {Struct} />
{/if}
