<script lang="ts">
	import { env } from '$env/dynamic/public';
	import Avatar from '../../Avatar.svelte';
	import Button from '../../form/Button.svelte';

	export let bio: string = '';
	export let url: string = '';
	export let username: string;
	export let selfProfile: boolean = false;
</script>

<div class="container mx-auto">
	<section
		class="flex flex-col md:flex-row items-center justify-start bg-white shadow rounded-lg px-6 md:px-12 pb-6 md:pb-10 w-full md:space-x-12"
	>
		<div class="inline-flex relative w-full items-start md:space-x-12 pt-12">
			<div class="inline-flex absolute md:static -top-14 -right-0">
				<Avatar {username} size="lg" />
			</div>
			<div class="grow space-y-4 w-full">
				<div class="space-y-4 flex flex-col">
					<h1 class="text-2xl font-semibold text-gray-800">{username}</h1>
					<a href="/users/{username}">@{username}</a>
					{#if url}
						<a
							href={url}
							target="_blank"
							class="inline-flex items-center font-medium text-primary-600 bg-primary-600 bg-opacity-10 rounded px-4 space-x-2 max-w-full w-max"
							rel="noreferrer"
						>
							<svg class="w-4 h-4">
								<use href="/images/images.svg#icon-link" />
							</svg>
							<div class="py-2 bg-transparent focus:outline-none px-1 truncate inline-flex w-max">
								{url}
							</div>
						</a>
					{/if}
				</div>
				{#if bio}
					<div class="space-y-1">
						<h1 class="font-semibold text-gray-800">Biography</h1>
						<p class="text-grayx-500">{bio}</p>
					</div>
				{/if}
			</div>
		</div>
		<div class="actions__ flex flex-col pt-4 w-full md:w-max h-full flex-shrink-0 my-auto">
			{#if selfProfile}
				<Button theme="primary" size="lg">Edit my profile</Button>
			{:else}
				<Button theme="primary" size="lg">Follow</Button>
			{/if}
		</div>
	</section>
</div>
