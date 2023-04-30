<script lang="ts">
	import type { Activity, Tag } from '$lib/types';
	import { parseTags } from '$lib/utils/data';
	import { getMemberSince } from '$lib/utils/date';
	import { getActivityTitle, timeSince, timeToDateISO } from '$lib/utils/format';
	import ActivityMeta from './ActivityMeta.svelte';

	import Avatar from './Avatar.svelte';
	import Button from './form/Button.svelte';
	import InputHash from './form/InputHash.svelte';

	export let activity: Activity;
	export let loggedIn: boolean = false;

	$: tags = parseTags(activity.file?.tags || {});
</script>

<article>
	<div
		class="activity flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center bg-white shadow-base rounded-xl md:px-8 py-8 w-full"
	>
		<div class="flex flex-col flex-1 items-center md:flex-row space-y-4 md:space-y-0">
			<div class="activity__author flex flex-col items-center space-y-2">
				<Avatar username={activity.author.username} />
				<div class="text-center">
					<a href="/users/{activity.author.username}" class="font-bold"
						>{activity.author.username}</a
					>
					<p class="text-grayx-500">Member since {getMemberSince(activity.author.member_since)}</p>
				</div>
				<div>
					<Button href={loggedIn ? undefined : '/auth/login'}>
						{activity.follow ? 'UnFollow' : 'Follow'}
					</Button>
				</div>
			</div>
			<div
				class="activity__info flex-1 md:border-l lg:border-r h-full flex flex-col items-start px-6 md:px-8 space-y-6"
			>
				<p class="activity__title space-x-1 flex flex-col md:flex-row">
					<span class="flex space-x-1">
						<a class="activity__info__author" href="/users/{activity.author.username}">
							{activity.author.username}
						</a>
						<a class="activity__info__type" href="/files/{activity.file?.hash}"
							>{getActivityTitle(activity.type)}</a
						>
					</span>
					<time class="activity__time" datetime={timeToDateISO(activity.date * 1000)}>
						{timeSince(activity.date * 1000)}
					</time>
				</p>
				<InputHash hash={activity.file?.hash} />
				{#if activity.file}
					<ActivityMeta file={activity.file} />
				{/if}
			</div>
		</div>
		<div class="tags flex flex-row lg:flex-col items-center md:items-start lg:space-y-1">
			<p class="tags__title hidden lg:block">TAGS</p>
			<ul class="tags__list">
				{#if tags.length > 0}
					{#each tags as tag}
						<li class="tags__tag tags__tag--{tag.category}">
							<a href="/tags/{tag.category}-{tag.name}">{tag.name}</a>
						</li>
					{/each}
				{:else}
					<p class="text-grayx-800 font-medium">No tags.</p>
				{/if}
			</ul>
		</div>
	</div>
</article>

<style lang="scss">
	.activity {
		&__time {
			@apply text-grayx-400;
		}

		&__author,
		.tags {
			@apply md:px-8 2xl:px-10 lg:w-48 2xl:w-60;

			&__title {
				@apply font-semibold text-grayx-400;
			}
		}

		&__info {
			@apply 2xl:py-4;

			&__author,
			&__type {
				@apply font-semibold;
			}
		}
	}
</style>
