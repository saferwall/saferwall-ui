<script lang="ts">
	import type { Activity } from '$lib/types';
	import ActivityItem from '$lib/components/Activity.svelte';
	import { createEventDispatcher } from 'svelte';
	import LoadMore from '$lib/components/LoadMore.svelte';

	const dispatch = createEventDispatcher();

	export let activities: Activity[] = [];
	export let loggedIn = false;

	export let loading = false;
	export let reachEnd = false;
</script>

<section class="latest__ space-y-4">
	<h4 class="font-medium text-xl">Latest activities</h4>
	{#if !activities || activities.length === 0}
		<p class="text-grayx-600">No activities available currently</p>
	{:else}
		<div class="activities__ space-y-8 pt-6">
			{#each activities as activity}
				<ActivityItem {loggedIn} {activity} />
			{/each}
		</div>
		<LoadMore on:load={() => dispatch('load')} {reachEnd} {loading}>Show more activities</LoadMore>
	{/if}
</section>
