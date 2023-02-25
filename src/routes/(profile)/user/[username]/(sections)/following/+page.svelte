<script lang="ts">
	import type { PageData } from './$types';

	import Button from '$lib/components/form/Button.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import DateTime from '$lib/components/DateTime.svelte';

	export let data: PageData;

	$: items = Array.isArray(data.pagination.items) ? (data.pagination.items as any) : [];
</script>

<div class="grid md:grid-cols-2 md:gap-x-14 lg:gap-x-20 py-10">
	{#each items as item}
		<article
			class="flex z-0 relative flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 py-6 lg:py-8 mg:px-12"
		>
			<div
				class="flex flex-col md:flex-row w-full md:space-x-4 items-center space-y-4 md:space-y-0"
			>
				<div class="flex px-3 md:px-0 w-full space-x-4 items-center">
					<Avatar username={item.username} size="base" />
					<div class="flex flex-col w-full">
						<h2 class="font-medium text-lg">@{item.username}</h2>
						<DateTime class="text-gray-400 text-sm" date={item.member_since} />
					</div>
				</div>
				<Button class="w-full md:w-max z-30" size="small">
					<svg class="w-4 h-4 mr-2">
						<use href="/images/images.svg#icon-like" />
					</svg>
					<span>{item.follow ? 'Unfollow' : 'Follow'}</span>
				</Button>
			</div>
			<a class="absolute opacity-0 z-20 inset-0" href="/user/{item.username}">
				{item.username}
			</a>
		</article>
	{/each}
</div>
