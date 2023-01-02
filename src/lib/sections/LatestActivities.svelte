<script lang="ts">
	import type { Activity } from '$lib/types';
	import ActivityItem from '$lib/components/Activity.svelte';
	import data from '$lib/data/demo';

	export const activities: Activity[] = data.activities;
</script>

<section class="latest__ space-y-4">
	<h4 class="font-medium text-xl">Latest activities</h4>
	{#if activities.length === 0}
		<p class="text-grayx-600">No activities available currently</p>
	{:else}
		<div class="activities__ space-y-8 pt-6">
			{#each activities as activity}
				<ActivityItem {activity} />
			{/each}
		</div>
	{/if}
</section>
