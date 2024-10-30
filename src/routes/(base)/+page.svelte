<script lang="ts">
	import LatestActivities from '$lib/components/LatestActivities.svelte';
	import UploadBox from '$lib/components/UploadBox.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let loading = false;
	let reachEnd = false;

	$: client = data.client;
	$: loggedIn = data.user !== undefined;
	$: activities = data.pagination.items;
	$: pagination = data.pagination;

	const onLoadMore = async () => {
		loading = true;

		try {
			pagination.page += 1;

			let p: Record<string, any> = { ...pagination };
			delete p.items;
			const newActivities = await client.getActivities(p);

			if (newActivities.items === null || newActivities.items.length !== newActivities.per_page) {
				reachEnd = true;
				throw new Error('User has reached end of activities');
			}

			activities = [...activities, ...newActivities.items];

			/* note: maybe ayoub broke the page_count? it's always zero */
			// if (pagination.page >= pagination.page_count) {
			// 	reachEnd = true;
			// }
		} catch (error) {
			console.error(error);
		}
		loading = false;
	};
</script>

<svelte:head>
	<title>Saferwall Beta 1.0</title>
</svelte:head>

<div class="container mx-auto py-10 space-y-20 px-4">
	<UploadBox {loggedIn} {client} />
	<LatestActivities on:load={onLoadMore} {loading} {reachEnd} {loggedIn} {activities} />
</div>
