<script lang="ts">
	import type { PageData } from './$types';
	import { SaferwallClient } from '$lib/clients/saferwall';
	import LatestActivities from '$lib/components/LatestActivities.svelte';
	import UploadBox from '$lib/components/UploadBox.svelte';

	export let data: PageData;

	let loading = false;
	let reachEnd = false;

	$: session = data.session;
	$: loggedIn = data.user !== undefined;
	$: activities = data.pagination.items;
	$: pagination = data.pagination;

	const onLoadMore = async () => {
		loading = true;

		try {
			pagination.page += 1;

			const newActivities = await new SaferwallClient(session).getActivities(pagination);

			if (newActivities.items === null) {
				reachEnd = true;
				throw new Error('User has reached end of activities');
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
	<LatestActivities on:load={onLoadMore} {loading} {reachEnd} {loggedIn} {activities} />
</div>
