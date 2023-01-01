<script lang="ts">
	import type { Activity } from '$lib/types';
	import { label_class, member_since } from '$lib/utils/date';

	import Avatar from './Avatar.svelte';
	import Button from './form/Button.svelte';

	export let activity: Activity;
</script>

<article>
	<div
		class="activity bg-white shadow-sm rounded-xl p-8 inline-flex justify-between items-center w-full"
	>
		<div class="authorf_ px-8 flex flex-col items-center space-y-2 lg:pr-10">
			<Avatar image="https://i.pravatar.cc/300" name={activity.author.username} />
			<div class="name__ text-center">
				<a href="/profile" class="font-bold">{activity.author.username}</a>
				<p class="text-grayx-500">Member since {member_since(activity.author.member_since)}</p>
			</div>
			<div class="action__">
				<Button>Follow</Button>
			</div>
		</div>
		<div
			class="activity__info flex-1 border-r border-l h-full flex flex-col items-start px-8 space-y-4"
		>
			<p class="activity__title">
				<a class="activity__info__author" href="/">{activity.author.username}</a>
				<span class="activity__info__type">submitted a file</span>
				<time class="activity__time" datetime="2018-07-07">4 days ago</time>
			</p>
			<p class="hash__ w-full bg-grayx-100 rounded">
				<input
					class="w-full px-4 py-2 bg-transparent"
					type="text"
					readonly
					value={activity.file?.hash}
				/>
			</p>
			<ul class="activity__meta flex items-center justify-center space-x-10">
				<li class="activity__meta__item">
					<span>CLASSIFICATION</span>
					<span class="capitalize">{label_class(activity.file?.class)}</span>
				</li>
				<li class="activity__meta__item">
					<span>ANTIVIRUS</span>
					<span>{activity.file?.multiav.value}/{activity.file?.multiav.count}</span>
				</li>
				<li class="activity__meta__item">
					<span>FILE NAME</span>
					<span class="w-full">
						<input type="text" value={activity.file?.filename} />
					</span>
				</li>
			</ul>
		</div>
		<div class="activity__tags px-8  lg:pl-10">
			<p class="activity__tags__title">TAGS</p>
			<ul class="activity__tags__list">
				<li>nsis</li>
				<li>zhrw</li>
				<li>nsis</li>
				<li>xyz</li>
				<li>zhrw</li>
				<li>xyz</li>
			</ul>
		</div>
	</div>
</article>

<style lang="scss">
	.activity {
		&__time {
			@apply text-grayx-400;
		}

		&__info {
			&__author,
			&__type {
				@apply font-medium;
			}
		}
		&__tags {
			&__title {
				@apply font-semibold text-grayx-400;
			}

			&__list {
				@apply flex flex-wrap lg:w-56;

				li {
					@apply m-1 py-1.5 px-3 bg-grayx-100 rounded;
				}
			}
		}

		&__meta {
			&__item {
				@apply flex flex-col;
				& span:first-child {
					@apply font-semibold text-grayx-400;
				}
				& span:last-child {
					@apply font-semibold;
				}
			}
		}
	}
</style>
