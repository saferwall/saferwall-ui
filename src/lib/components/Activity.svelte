<script lang="ts">
	import type { Activity, Tag } from '$lib/types';
	import { getMemberSince } from '$lib/utils/date';
	import {
		getActivityTitle,
		getLabelClass,
		getLabelIcon,
		parseTags,
		timeSince,
		timeToDateISO
	} from '$lib/utils/format';

	import Avatar from './Avatar.svelte';
	import Button from './form/Button.svelte';
	import InputHash from './InputHash.svelte';

	export let activity: Activity;

	$: tags = parseTags(activity.file?.tags || {});
</script>

<article>
	<div
		class="activity flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center bg-white shadow-base rounded-xl md:px-8 py-8 w-full"
	>
		<div class="flex flex-col flex-1 items-center md:flex-row space-y-4 md:space-y-0">
			<div class="activity__author flex flex-col items-center space-y-2">
				<Avatar
					image="https://robohash.org/{activity.author.username}?set=set1&bgset=bg1&size=200x200"
					username={activity.author.username}
				/>
				<div class="name__ text-center">
					<a href="/user/{activity.author.username}" class="font-bold">{activity.author.username}</a
					>
					<p class="text-grayx-500">Member since {getMemberSince(activity.author.member_since)}</p>
				</div>
				<div class="action__">
					<Button>Follow</Button>
				</div>
			</div>
			<div
				class="activity__info flex-1 md:border-l lg:border-r h-full flex flex-col items-start px-6 md:px-8 space-y-6"
			>
				<p class="activity__title space-x-1 flex flex-col md:flex-row">
					<span class="flex space-x-1">
						<a class="activity__info__author" href="/user/{activity.author.username}">
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
				<ul
					class="activity__meta flex flex-wrap md:flex-nowrap items-center md:justify-center space-y-1 md:space-y-0"
				>
					<li class="activity__meta__item">
						<span>CLASSIFICATION</span>
						<div
							class="capitalize activity__label activity__label--{getLabelClass(
								activity.file?.class
							)}"
						>
							<svg class="w-4 h-4"
								><use href="/images/images.svg#icon-{getLabelIcon(activity.file?.class)}" /></svg
							>
							<span>{getLabelClass(activity.file?.class)}</span>
						</div>
					</li>
					<li class="activity__meta__item">
						<span>ANTIVIRUS</span>
						<span>{activity.file?.multiav.value}/{activity.file?.multiav.count}</span>
					</li>
					<li class="activity__meta__item flex-1">
						<span>FILE NAME</span>
						<span class="w-full">
							<input class="w-full" type="text" value={activity.file?.filename} />
						</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="activity__tags flex flex-row lg:flex-col items-center md:items-start lg:space-y-1">
			<p class="activity__tags__title hidden lg:block">TAGS</p>
			<ul class="activity__tags__list">
				{#if tags.length > 0}
					{#each tags as tag}
						<li class="activity__tag activity__tag--{tag.category}">
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
		&__tags {
			@apply md:px-8 2xl:px-10 lg:w-48 2xl:w-60;
		}

		&__info {
			@apply 2xl:py-4;

			&__author,
			&__type {
				@apply font-semibold;
			}
		}
		&__tag {
			@apply bg-grayx-100;

			&--eset {
				@apply bg-red-200 text-red-900;
			}
			&--pe,
			&--packer {
				@apply bg-blue-200 text-blue-900;
			}
		}
		&__tags {
			&__title {
				@apply font-semibold text-grayx-400;
			}

			&__list {
				@apply flex flex-wrap justify-center lg:justify-start;

				li {
					@apply m-1 py-1.5 px-3 rounded;
				}
			}
		}

		&__meta {
			@apply w-full;

			&__item {
				@apply flex flex-col mr-4;

				& span:first-child {
					@apply font-semibold text-grayx-400;
				}
				& span:last-child {
					@apply font-semibold text-sm;
				}
			}
		}

		&__label {
			@apply flex items-center space-x-1;

			&--benign {
				@apply text-green-500;
			}
			&--unknown {
				@apply text-orange-500;
			}
			&--malicious {
				@apply text-red-500;
			}
		}
	}
</style>
