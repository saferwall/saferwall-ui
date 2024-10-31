<script lang="ts">
	import type { PageData } from './$types';

	import ActivityMeta from '$lib/components/ActivityMeta.svelte';
	import ButtonLike from '$lib/components/form/ButtonLike.svelte';
	import InputHash from '$lib/components/form/InputHash.svelte';

	import LoadMoreContainer from '$lib/components/LoadMoreContainer.svelte';

	export let data: PageData;

	$: client = data.client;
	$: section = data.section;
	$: username = data.username;
	$: loggedIn = data.user !== undefined;
	$: pagination = data.pagination;
</script>

<LoadMoreContainer
	initItems={data.pagination?.items}
	{client}
	{username}
	{pagination}
	{section}
	let:items
>
	{#each items as item}
		<li class="flex flex-col md:flex-row space-y-6 border-t-zinc-300 dark:border-t-zinc-700 md:space-y-0 md:space-x-6 py-6 lg:py-8">
			<div class="w-full space-y-4">
				<InputHash hash={item.file.hash} behavior_id={item.file?.default_behavior_id}/>
				<ActivityMeta file={item.file} />
			</div>
			<div class="w-full md:w-max">
				<ButtonLike
					class="w-full md:w-max md:border-none"
					size="sm"
					{loggedIn}
					liked={item.liked}
					hash={item.file.hash}
				/>
			</div>
		</li>
	{/each}
</LoadMoreContainer>
