<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import ButtonFollow from '$lib/components/form/ButtonFollow.svelte';
	import type { Saferwall } from '$lib/types';

	export let loggedIn = false;
	export let item: Saferwall.Activities.Follow;
</script>

<article
	class="flex z-0 relative flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 py-6 lg:py-8 mg:px-12"
>
	<div class="flex flex-col md:flex-row w-full md:space-x-4 items-center space-y-4 md:space-y-0">
		<div class="flex px-3 md:px-0 w-full space-x-4 items-center">
			<Avatar username={item.username} size="base" />
			<div class="flex flex-col w-full">
				<h2 class="font-medium text-lg">@{item.username}</h2>
				<DateTime class="text-gray-400 text-sm" date={item.member_since} />
			</div>
		</div>
		<div class="z-30">
			<ButtonFollow username={item.username} {loggedIn} followed={item.follow} />
		</div>
	</div>
	<a class="absolute opacity-0 z-10 inset-0" href="/users/{item.username}">
		{item.username}
	</a>
</article>
