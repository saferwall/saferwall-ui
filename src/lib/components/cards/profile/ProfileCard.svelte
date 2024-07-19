<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import ButtonFollow from '$lib/components/form/ButtonFollow.svelte';
	import Avatar from '../../Avatar.svelte';
	import Button from '../../form/Button.svelte';

	export let bio: string = '';
	export let url: string = '';
	export let username: string;
	export let followed = false;
	export let loggedIn = false;
	export let selfProfile = false;
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
				<div class="flex flex-col">
					<h1 class="text-2xl font-semibold text-gray-800">{username}</h1>
					<a href="/users/{username}">@{username}</a>
					{#if url}
						<a
							href={url}
							target="_blank"
							class="inline-flex items-center font-medium text-primary-600 bg-primary-600 bg-opacity-10 rounded px-4 space-x-2 max-w-full w-max mt-4"
							rel="noreferrer"
						>
							<Icon name="link" size="w-4 h-4" />
							<div class="py-2 bg-transparent focus:outline-none px-1 truncate inline-flex w-max">
								{url}
							</div>
						</a>
					{/if}
				</div>
				{#if bio}
					<div class="space-y-1">
						<h1 class="font-semibold text-gray-800">Biography</h1>
						<p class="text-neutral-500">{bio}</p>
					</div>
				{/if}
			</div>
		</div>
		<div class="actions__ flex flex-col pt-4 w-full md:w-max h-full flex-shrink-0 my-auto">
			{#if selfProfile}
				<Button href="/account/settings" theme="primary" size="lg">Edit my profile</Button>
			{:else}
				<!-- TODO: user follow status -->
				<ButtonFollow {username} {loggedIn} {followed} size="xl" />
			{/if}
		</div>
	</section>
</div>
