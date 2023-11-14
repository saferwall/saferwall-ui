<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { getMemberSince } from '$lib/utils';
	import { Viewer } from 'bytemd';

	import Avatar from '$lib/components/Avatar.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Card from '../../Card.svelte';

	export let author: Saferwall.Author;
	export let comment: string;
	export let date: number;
</script>

<Card spacing={false}>
	<div class="flex space-x-6 items-center">
		<Avatar size="md" username={author.username} />
		<div class="text-sm">
			<a href="/users/{author.username}" class="font-bold">{author.username}</a>
			<p class="text-neutral-500">Member since {getMemberSince(author.member_since)}</p>
		</div>
		<div>
			<Button size="xss">Follow</Button>
		</div>
	</div>
	<section class="prose my-2">
		<Viewer value={comment} />
	</section>
	<div class="flex items-center text-neutral-500 space-x-2">
		<Icon name="calendar" size="w-4 h-4" />
		<DateTime {date} />
	</div>
</Card>
