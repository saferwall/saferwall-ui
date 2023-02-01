<script lang="ts">
	import type { Author } from '$lib/types/comments';
	import { getMemberSince } from '$lib/utils/date';
	import { Viewer } from 'bytemd';

	import Avatar from '$lib/components/Avatar.svelte';
	import BaseCard from '../BaseCard.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import Icon from '$lib/components/Icon.svelte';

	export let date: number;
	export let author: Author;
	export let comment: string;
</script>

<BaseCard spacing={false}>
	<div class="flex space-x-6 items-center">
		<Avatar size="medium" username={author.username} hasAvatar={true} />
		<div class="text-sm">
			<a href="/user/{author.username}" class="font-bold">{author.username}</a>
			<p class="text-grayx-500">Member since {getMemberSince(author.member_since)}</p>
		</div>
		<div>
			<Button size="xsmall">Follow</Button>
		</div>
	</div>
	<section class="prose my-2">
		<Viewer value={comment} />
	</section>
	<div class="flex items-center text-grayx-500 space-x-2">
		<Icon name="calendar" size="w-4 h-4" />
		<DateTime {date} />
	</div>
</BaseCard>
