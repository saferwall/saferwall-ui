<script lang="ts">
	import type { LayoutData } from './$types';

	import TabsCard from '$lib/components/cards/TabsCard.svelte';

	export let data: LayoutData;

	$: profile = data.profile;
	$: section = data.section;
	$: username = data.username;
	$: currentPath = data.currentPath;

	$: heading = [
		{
			title: 'Likes',
			count: profile.likes_count,
			...generatePath('likes')
		},
		...(profile.username !== 'Administrator'
			? [
					{
						title: 'Submissions',
						count: profile.submissions_count,
						...generatePath('submissions')
					}
			  ]
			: []),
		{
			title: 'Followers',
			count: profile.followers_count,
			...generatePath('followers')
		},
		{
			title: 'Following',
			count: profile.following_count,
			...generatePath('following')
		},
		{
			title: 'Comments',
			count: profile.comments_count,
			...generatePath('comments')
		}
	];

	$: itemsCount = data.pagination.items?.length || 0;

	const generatePath = (path: string) => {
		const sectionPath = `/users/${username}/${path}`;
		return {
			url: sectionPath,
			active: sectionPath == currentPath
		};
	};
</script>

<section class="container mx-auto pb-10">
	<TabsCard {heading}>
		{#if itemsCount > 0}
			<slot />
		{:else}
			<div class="px-6 md:px-10 py-20 text-center">
				<p>
					{username} has no {section} at the moment
				</p>
			</div>
		{/if}
	</TabsCard>
</section>
