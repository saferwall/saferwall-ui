<script lang="ts">
	import type { Saferwall } from '$lib/types';

	import { SaferwallClient } from '$lib/clients/saferwall';
	import LoadMore from './LoadMore.svelte';

	export let username: string;
	export let section: string;
	export let pagination: Saferwall.Pagination<Saferwall.Activities.All>;
	export let session: Saferwall.Session;
	export let initItems: Saferwall.Activities.All[] = [];

	let loading = false;
	let items: Saferwall.Activities.All[] = [...initItems];
	let updatedPagination = { ...pagination };
	let reachEnd = updatedPagination.page >= pagination.page_count;

	const onLoadMore = async () => {
		loading = true;

		try {
			updatedPagination.page += 1;

			const paginationResp = await new SaferwallClient(session).getUserSectionItems(
				username,
				section,
				updatedPagination
			);

			if (paginationResp.items === null) {
				reachEnd = true;
				throw new Error('user has reached the end of the Items');
			}

			items = [...items, ...paginationResp.items];

			if (updatedPagination.page >= pagination.page_count) {
				reachEnd = true;
			}
		} catch (error) {
			console.error(error);
		}

		loading = false;
	};
</script>

<ul class="divide-y">
	<slot {items} />
</ul>

<LoadMore on:load={onLoadMore} {loading} {reachEnd}>Load more</LoadMore>
