<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { getMemberSince } from '$lib/utils';

	import Avatar from '$lib/components/Avatar.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Card from '../../Card.svelte';
	import Viewer from '$lib/components/md-editor/components/Viewer.svelte';
	import { themeString } from '$lib/stores/theme';

	export let author: Saferwall.Author;
	export let comment: string;
	export let date: number;
</script>

<Card spacing={false}>
	<div class="flex gap-2.5 items-center">
		<Avatar size="md" class="size-10" username={author.username} />
		<div class="flex gap-[1.375rem] items-center">
			<div class="text-xs">
				<a href="/app/users/{author.username}" class="font-bold">{author.username}</a>
				<p class="text-tertiary-text">Member since {getMemberSince(author.member_since)}</p>
			</div>
			<Button size="xss">Follow</Button>
		</div>
	</div>
	<section class="my-2">
		<Viewer value={comment} theme={$themeString}/>
	</section>
	<div class="flex items-center text-tertiary-text space-x-2">
		<Icon name="calendar" size="w-4 h-4" />
		<DateTime {date} />
	</div>
</Card>
