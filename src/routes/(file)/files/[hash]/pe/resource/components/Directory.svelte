<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import DirectoryEntry from './DirectoryEntry.svelte';
	import ResourceData from './ResourceData.svelte';

	export let entries: Saferwall.Resource.Entry[];
	export let struct: Saferwall.Resource.Struct[];
</script>

{#if entries}
	<ul class="space-y-4">
		{#each entries as entry}
			<li>
				<DirectoryEntry {...entry} />
			</li>
		{/each}
	</ul>
{:else}
	<ResourceData {struct} />
{/if}
