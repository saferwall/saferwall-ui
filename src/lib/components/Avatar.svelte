<script lang="ts">
	export let size: string = 'base';
	export let image: string | undefined = undefined;
	export let username: string | undefined = undefined;
</script>

<a class="avatar avatar--{size}" href="/user/{username}">
	{#if image}
		<img class="avatar__image" src={image} alt="Avatar of {username}" />
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

		&:has(&__text) {
			@apply flex items-center justify-center flex-shrink-0 text-2xl font-bold text-grayx-900;
		}

		&__image {
			@apply w-full h-full object-cover;
		}

		&--base {
			@apply w-20 h-20;
		}

		&--large {
			@apply w-28 h-28;
		}
	}
</style>
