<script lang="ts">
	import { SaferwallClient } from '$lib/clients/saferwall';
	import UploadBox from '$lib/components/UploadBox.svelte';
	import LatestActivities from '$lib/sections/LatestActivities.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let loading = false;
	let reachEnd = false;

	$: session = data.session;
	$: activities = data.pagination.items;
	$: pagination = data.pagination as any;
	$: loggedIn = data.user !== undefined;

	const loadMoreActivities = async () => {
		loading = true;

		try {
			pagination.page += 1;

			const newActivities = await new SaferwallClient(session).getActivities(pagination);

			if (newActivities.items === null) {
				reachEnd = true;
				throw new Error('user has reached the end of the activities');
			}

			activities = [...activities, ...newActivities.items];

			if (pagination.page >= pagination.page_count) {
				reachEnd = true;
			}
		} catch (error) {
			console.error(error);
		}
		loading = false;
	};
</script>

<svelte:head>
	<title>Saferwall 2.0</title>
</svelte:head>

<div class="container mx-auto py-10 space-y-20">
	<UploadBox {loggedIn} {session} />
	<LatestActivities on:load={loadMoreActivities} {loading} {reachEnd} {loggedIn} {activities} />
</div>
