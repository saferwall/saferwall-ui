<script lang="ts">
	import type { PageData } from './$types';

	import SvelteMarkdown from 'svelte-markdown';
	import InputHash from '$lib/components/form/InputHash.svelte';
	import ActivityMeta from '$lib/components/ActivityMeta.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import Viewer from '$lib/components/cards/comments/Viewer.svelte';

	export let data: PageData;

	const options = {
		sanitize: true
	};

	$: username = data.username;
	$: items = Array.isArray(data.pagination.items) ? (data.pagination.items as any) : [];
</script>

<ul class="divide-y">
	{#each items as item}
		<li class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 py-6 lg:py-8">
			<div class="w-full space-y-4">
				<div class="flex flex-col space-y-2">
					<div class="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between">
						<div class="flex items-center space-x-4">
							<Avatar {username} size="sm" />
							<DateTime class="text-gray-500 text-sm" date={item.date} />
						</div>
						<div class="w-full md:w-max">
							<Button class="w-full md:w-max md:border-none" size="sm">
								<svg class="w-4 h-4 mr-2">
									<use href="/images/icons.svg#icon-like" />
								</svg>
								<span>Like</span>
							</Button>
						</div>
					</div>
					<div class="bg-gray-50 border border-opacity-20 border-gray-300 w-full p-2 rounded">
						<Viewer value={item.comment}></Viewer>
					</div>
				</div>
				<InputHash hash={item.file.hash} />
				<ActivityMeta file={item.file} />
			</div>
		</li>
	{/each}
</ul>
