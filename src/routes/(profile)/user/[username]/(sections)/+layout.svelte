<script lang="ts">
	import type { PageData } from './$types';

	import TabsCard from '$lib/components/cards/TabsCard.svelte';

	export let data: PageData;
	$: user = data.user;
	$: section = data.section;
	$: username = data.username;
	$: currentPath = data.currentPath;
	$: itemsCount = data.pagination.items?.length || 0;

	const generatePath = (path: string) => {
		const sectionPath = `/user/${user.username}/${path}`;
		return {
			url: sectionPath,
			active: sectionPath == currentPath
		};
	};

	$: heading = [
		{ title: 'Likes', count: user.likes_count, ...generatePath('likes') },
		{ title: 'Submissions', count: user.submissions_count, ...generatePath('submissions') },
		{ title: 'Followers', count: user.followers_count, ...generatePath('followers') },
		{ title: 'Following', count: user.following_count, ...generatePath('following') },
		{ title: 'Comments', count: user.comments_count, ...generatePath('comments') }
	];
</script>

<section class="container mx-auto pb-10">
	<TabsCard {heading}>
		{#if itemsCount > 0}
			<slot />
		{:else}
			<div class="inline-block px-6 md:px-10 py-20 text-center">
				{username} has no {section} at the moment
			</div>
		{/if}
	</TabsCard>
</section>
