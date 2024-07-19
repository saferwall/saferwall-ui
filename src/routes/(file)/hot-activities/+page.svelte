<script lang="ts">
	import HotActivity from '$lib/components/HotActivity.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: activities = data.activities;
</script>

<svelte:head>
	<title>Hot activities - Saferwall</title>
</svelte:head>

<main class="flex-1 flex flex-col h-full bg-neutral">
	<div class="container py-12 mx-auto h-full flex flex-col flex-1 space-y-10">
		<h1 class="text-2xl font-medium">Hot Activities</h1>
		{#if activities.length > 0}
			<div class="space-y-6">
				{#each activities as activity}
					<HotActivity {...activity} />
				{/each}
			</div>
		{:else}
			<div class="flex flex-1 flex-col justify-center my-auto items-center space-y-6 h-full">
				<div class="bg-white rounded-full p-4">
					<Icon size="w-24 h-24" name="hot-fire" />
				</div>
				<p class="text-gray-800">No hot activity currently available.</p>
			</div>
		{/if}
	</div>
</main>
