<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { getActivityTitle, parseTags, timeSince, timeToDateISO } from '$lib/utils';
	import ActivityMeta from './ActivityMeta.svelte';

	import Avatar from './Avatar.svelte';
	import ButtonFollow from './form/ButtonFollow.svelte';
	import InputHash from './form/InputHash.svelte';

	export let loggedIn = false;
	export let activity: Saferwall.Activities.All;

	$: file = activity.file;
	$: author = activity.author;
	$: tags = parseTags(file?.tags);
</script>

<article>
	<div
		class="activity max-w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center bg-neutral-600 rounded-card md:px-8 py-8 w-full"
	>
	
		{#if activity.type !== "follow"}
			<div class="max-w-full flex flex-col flex-1 items-center md:flex-row space-y-4 md:space-y-0 overflow-hidden">
				<div class="activity__author max-w-full flex flex-col items-center space-y-2">
					<Avatar username={author.username} />
					<div class="text-center">
						<a class="font-medium text-sm text-gray-100" href="/app/users/{author.username}">
							{author.username}
						</a>
						<p class="font-regular text-[13px] text-gray-500">
							Member since {timeSince(author.member_since)}
						</p>
					</div>
					<div>
						<ButtonFollow username={author.username} {loggedIn} followed={activity.follow} />
					</div>
				</div>
				<div
					class="activity__info max-w-full self-stretch flex-1 md:border-l lg:border-r border-neutral-700 flex flex-col items-start px-6 md:px-8 space-y-6 min-w-0"
				>
					<p class="activity__title space-x-1 flex flex-col md:flex-row">
						<span class="flex space-x-1">
							<a class="activity__info__author" href="/app/users/{author.username}">
								{author.username}
							</a>
							<a class="activity__info__type" href="/app/files/{file?.hash}?behavior_id={file?.default_behavior_id ?? ""}">
								{getActivityTitle(activity)}
							</a>
						</span>
						<time class="activity__time" datetime={timeToDateISO(activity.date)}>
							{timeSince(activity.date)}
						</time>
					</p>
					<InputHash hash={file?.hash} behavior_id={file?.default_behavior_id} />
					{#if file}
						<ActivityMeta {file} />
					{/if}
				</div>
			</div>
			<div
				class="tags flex flex-row lg:flex-col items-center md:items-start lg:space-y-1"
				class:max-lg:hidden={tags.length === 0}
			>
				<p class="tags__title hidden lg:block">TAGS</p>
				<ul class="flex flex-wrap gap-[7px]">
					{#if tags.length > 0}
						{#each tags as tag}
							<li class="flex">
								<a class="rounded-sm px-2.5 py-1.5 tags__tag tags__tag--{tag.category}" href="/app/tags/{tag.category}-{tag.name}">{tag.name}</a>
							</li>
						{/each}
					{:else}
						<p class="text-zinc-400 font-medium">No tags.</p>
					{/if}
				</ul>
			</div>
		{:else}
			<div class="w-full flex flex-col [@media_(min-width:550px)]:flex-row items-center justify-center gap-[1ch]">
				<div class="h-full py-3 px-4 rounded-lg">
					<div class="activity__author w-fit px-0 max-w-full flex flex-col items-center space-y-2">
						<Avatar username={author.username} />
						<div class="text-center">
							<p class="font-regular text-[13px] text-gray-500">
								Member since<br>{timeSince(author.member_since)}
							</p>
						</div>
						<div>
							<ButtonFollow username={author.username} {loggedIn} followed={activity.follow} />
						</div>
					</div>
				</div>
				<div class="font-medium text-sm py-3">
					<a class="font-medium text-sm text-gray-100" href="/app/users/{author.username}">
						{author.username}
					</a>
					<span class="text-gray-100">
						followed
					</span>
					<a class="font-medium text-sm text-gray-100" href="/app/users/{activity.target}">
						{activity.target}
					</a>
					<div class="text-center">
						<time class="activity__time" datetime={timeToDateISO(activity.date)}>
							{timeSince(activity.date)}
						</time>
					</div>
				</div>
				<div class="h-full p-3 rounded-lg">
					<div class="activity__author w-fit px-0 max-w-full flex flex-col items-center space-y-2">
						<Avatar username={activity.target} />
						<div class="text-center">
							
							<p class="font-regular text-[13px] text-gray-500">
								Member since<br>{timeSince(author.member_since)}
							</p>
						</div>
						<div>
							<ButtonFollow username={activity.target} {loggedIn} followed={activity.follow} />
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</article>

<style lang="postcss">
	.activity {
		&__time {
			@apply text-gray-500;
		}

		&__author,
		.tags {
			@apply md:px-8 2xl:px-10 lg:w-48 2xl:w-60;

			&__title {
				@apply font-medium text-gray-100;
			}
		}

		&__info {
			@apply 2xl:py-4;

			&__author,
			&__type {
				@apply font-medium;
			}
		}
	}
</style>
