<script lang="ts">
	import UploadBox from '$lib/components/UploadBox.svelte';
	import LatestActivities from '$lib/sections/LatestActivities.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	// TODO: infinite scroll <> loading activities
	$: activities = data.pagination.items;
	$: loggedIn = data.user !== undefined;
</script>

<svelte:head>
	<title>Saferwall 2.0</title>
</svelte:head>

<div class="container mx-auto py-10 space-y-20">
	<UploadBox {loggedIn} />
	<LatestActivities {loggedIn} {activities} />
</div>
