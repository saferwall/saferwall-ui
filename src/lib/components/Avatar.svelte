<script lang="ts">
	import { env } from '$env/dynamic/public';

	const DEFAULT_AVATAR = '/images/default-avatar.svg';

	export let size: string = 'base';
	export let image: string | undefined = undefined;
	export let username: string | undefined = undefined;

	$: avatarImage =
		image ||
		env.PUBLIC_AVATAR_API_URL.replace('{username}', `${username}`.toLowerCase()) ||
		DEFAULT_AVATAR;

	const setDefaultAvatar = (event: any) => {
		event.target.src = DEFAULT_AVATAR;
	};
</script>

<a class="avatar avatar--{size}" href="/user/{username}">
	{#if avatarImage}
		<img
			class="avatar__image"
			src={avatarImage}
			alt="Avatar of {username}"
			on:error={(event) => setDefaultAvatar(event)}
		/>
	{:else if username}
		<span class="avatar__text">{username?.slice(0, 3)}</span>
	{:else}
		<svg class="w-full h-full text-grayx-100">
			<use href="/images/images.svg#default-avatar" />
		</svg>
	{/if}
</a>

<style lang="scss">
	.avatar {
		@apply rounded-full bg-white overflow-hidden;
		@apply border border-grayx flex-shrink-0;

		&:has(&__text) {
			@apply flex items-center justify-center flex-shrink-0 text-2xl font-bold text-grayx-900;
		}

		&__image {
			@apply w-full h-full object-cover;
		}

		&--small {
			@apply w-12 h-12;
		}

		&--medium {
			@apply w-14 h-14;
		}

		&--base {
			@apply w-20 h-20;
		}

		&--large {
			@apply w-32 h-32;
		}
	}
</style>
