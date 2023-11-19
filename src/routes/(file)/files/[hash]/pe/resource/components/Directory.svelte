<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import DirectoryEntry from './DirectoryEntry.svelte';
	import ResourceData from './ResourceData.svelte';

	export let Entries: Saferwall.Resource.Entry[];
	export let Struct: Saferwall.Resource.Struct[];
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
