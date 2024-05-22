<script lang="ts">
	import FollowCard from '$lib/components/cards/profile/FollowCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: loggedIn = data.user !== undefined;
	$: paginationItems = data.pagination.items;
	$: items = Array.isArray(paginationItems) ? paginationItems : [];
</script>

<div class="grid md:grid-cols-2 md:gap-x-14 lg:gap-x-20 py-10">
	{#each items as item}
		<FollowCard {item} {loggedIn} />
	{/each}
</div>
