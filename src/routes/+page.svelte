<script>
	import UploadBox from '$lib/components/UploadBox.svelte';
	import LatestActivities from '$lib/sections/LatestActivities.svelte';
</script>

<svelte:head>
	<title>Saferwall 2.0</title>
</svelte:head>

<div class="container mx-auto py-10 space-y-20">
	<UploadBox />
	<LatestActivities />
</div>
