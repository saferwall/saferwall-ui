<script lang="ts">
	import HotActivity from '$lib/components/HotActivity.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: activities = data.activities;
</script>

<svelte:head>
	<title>Hot activities - Saferwall</title>
</svelte:head>

<main class="flex-1 flex flex-col h-full bg-grayx">
	<div class="container mx-auto py-12 space-y-12">
		<h1 class="text-2xl font-medium">Hot Activities</h1>

		<div class="space-y-6">
			{#each activities as activity}
				<HotActivity {...activity} />
			{/each}
		</div>
	</div>
</main>
