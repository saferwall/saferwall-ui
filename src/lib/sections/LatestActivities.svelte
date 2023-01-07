<script lang="ts">
	import type { Activity } from '$lib/types';
	import ActivityItem from '$lib/components/Activity.svelte';
	import data from '$lib/data/demo';

	export const activities: Activity[] = data.activities.slice(-3);
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

			<div class="w-full flex-center rounded cursor-pointer text-primary space-x-2 font-medium">
				<div class="flex-center space-x-1">
					<span>Show more activities</span>
					<svg class="w-4 h-2"><use href="/images/images.svg#icon-arrow-down" /></svg>
				</div>
			</div>
		</div>
	{/if}
</section>
