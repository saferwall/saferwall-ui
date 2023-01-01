<script lang="ts">
	export let image: string | undefined;
	export let name: string | undefined;
</script>

<div class="avatar">
	{#if image}
		<img class="avatar__image" src={image} alt="Avatar of {name}" />
	{:else}
		<span class="avatar__text">{name?.slice(0, 3)}</span>
	{/if}
</div>

<style lang="scss">
	.avatar {
		@apply w-20 h-20 rounded-full bg-grayx-100 overflow-hidden;

		&:has(&__text) {
			@apply flex items-center justify-center flex-shrink-0 text-2xl font-bold text-grayx-900;
		}

		&__image {
			@apply w-full h-full object-cover;
		}
	}
</style>
