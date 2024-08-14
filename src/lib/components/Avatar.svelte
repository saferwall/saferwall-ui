<script lang="ts">
	import { PUBLIC_AVATAR_API_URL } from '$env/static/public';

	const DEFAULT_AVATAR = '/images/default-avatar.svg';

	export let size: 'base' | 'xs' | 'sm' | 'md' | 'lg' = 'base';
	export let image: string | undefined = undefined;
	export let username: string | undefined = undefined;

	$: avatarImage =
		image ||
		(username && PUBLIC_AVATAR_API_URL.replace('{username}', `${username}`.toLowerCase())) ||
		DEFAULT_AVATAR;

	const onImageError = (event: Event & { currentTarget: EventTarget & Element }) => {
		(event.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
	};
</script>

<a class="avatar avatar--{size}" on:click href="/users/{username}">
	{#if avatarImage}
		<img
			class="avatar__image"
			src={avatarImage}
			alt="Avatar of {username}"
			on:error={onImageError}
		/>
	{:else if username}
		<span class="avatar__text">{username?.slice(0, 3)}</span>
	{:else}
		<svg class="w-full h-full text-neutral-100">
			<use href="/images/icons.svg#default-avatar" />
		</svg>
	{/if}
	<slot/>
</a>

<style lang="postcss">
	.avatar {
		@apply rounded-full bg-white overflow-hidden;
		@apply border border-neutral-500 flex-shrink-0 inline-block;

		&:has(&__text) {
			@apply flex items-center justify-center flex-shrink-0 text-2xl font-bold text-neutral-900;
		}

		&__image {
			@apply w-full h-full object-cover;
		}

		&--xs {
			@apply w-9 h-9;
		}

		&--sm {
			@apply w-10 h-10;
		}

		&--md {
			@apply w-14 h-14;
		}

		&--base {
			@apply w-20 h-20;
		}

		&--lg {
			@apply w-32 h-32;
		}
	}
</style>
