<script lang="ts">
	import ActivityItem from '$lib/components/Activity.svelte';
	import LoadMore from '$lib/components/LoadMore.svelte';
	import type { Saferwall } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let activities: Saferwall.Activity[] = [];

	export let loggedIn = false;
	export let loading = false;
	export let reachEnd = false;

	const onLoad = () => {
		dispatch('load');
	};
</script>

<section class="latest__ space-y-4">
	<h4 class="font-medium text-xl">Latest activities</h4>
	{#if !activities || activities.length === 0}
		<p class="text-tertiary-text">No activities available currently</p>
	{:else}
		<div class="activities__ space-y-8 pt-6">
			{#each activities as activity}
				{#if activity.type == "submit"}
				{/if}
				<ActivityItem {loggedIn} {activity} />
			{/each}
		</div>
		<LoadMore on:load={onLoad} {reachEnd} {loading}>Show more activities</LoadMore>
	{/if}
</section>
