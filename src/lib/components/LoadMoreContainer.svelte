<script lang="ts">
	import { SaferwallClient } from '$lib/clients/saferwall';
	import type { Session } from '$lib/types';
	import type { APIItem } from '$lib/types/users';
	import LoadMore from './LoadMore.svelte';

	export let initItems: APIItem[] = [];
	export let session: Session;
	export let username: string;
	export let section: string;
	export let pagination: any;

	let loading = false;
	let items: APIItem[] = [...initItems];
	let updatedPagination = { ...pagination };
	let reachEnd = updatedPagination.page >= pagination.page_count;

	const loadMoreItems = async () => {
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

<LoadMore on:load={loadMoreItems} {loading} {reachEnd}>Load more</LoadMore>
