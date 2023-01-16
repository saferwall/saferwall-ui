<script lang="ts">
	import Avatar from './Avatar.svelte';
	import Button from './form/Button.svelte';

	export let bio: string = '';
	export let github: string = '';
	export let username: string;
</script>

<div class="container mx-auto">
	<section
		class="flex flex-col md:flex-row items-center justify-start bg-white shadow rounded-lg px-6 md:px-12 pb-6 md:pb-14 w-full md:space-x-12"
	>
		<div class="inline-flex w-full items-center space-x-6 md:space-x-12">
			<div class="inline-flex mt-12">
				<Avatar size="large" />
			</div>
			<div class="grow space-y-4 max-w-full truncate">
				<div class="space-y-4">
					<h1 class="text-xl font-semibold text-gray-800">{username}</h1>
					{#if github}
						<a
							href={github}
							target="_blank"
							class="flex items-center font-medium text-primary-600 bg-primary-600 bg-opacity-10 rounded px-4 space-x-2  w-max"
							rel="noreferrer"
						>
							<svg class="w-4 h-4">
								<use href="/images/images.svg#icon-link" />
							</svg>
							<p class="py-2 bg-transparent focus:outline-none px-1">
								{github}
							</p>
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
		<div class="actions__ flex flex-shrink-0 pt-12">
			<Button theme="primary" size="large">Edit my profile</Button>
		</div>
	</section>
</div>
