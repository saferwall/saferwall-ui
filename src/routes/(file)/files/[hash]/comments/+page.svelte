<script lang="ts">
	import type { PageData } from './$types';

	import 'bytemd/dist/index.css';
	import 'github-markdown-css/github-markdown-light.css';

	import { Editor } from 'bytemd';
	import CommentCard from '$lib/components/cards/comments/CommentCard.svelte';
	import BaseCard from '$lib/components/cards/BaseCard.svelte';
	import Button from '$lib/components/form/Button.svelte';

	export let data: PageData;
	$: comments = data.pagination.items;

	let comment: string = '';

	function handleChange(event: { detail: { value: string } }) {
		comment = event.detail.value;
	}
</script>

<section class="file__comments container mx-auto space-y-4">
	{#each comments as comment}
		<CommentCard {...comment} />
	{/each}
	{#if comments.length === 0}
		<div class="flex-center py-12">
			<p class="text-grayx-500">No comments available</p>
		</div>
	{/if}
	<BaseCard spacing={false}>
		<Editor
			value={comment}
			previewDebounce={10}
			on:change={handleChange}
			placeholder="Insert comment here ..."
		/>
		<div class="w-full flex pt-4">
			<Button class="grow md:grow-0" size="small" theme="gray">Comment</Button>
		</div>
	</BaseCard>
</section>

<style lang="scss">
	.file__comments {
		:global(.bytemd) {
			@apply h-44;
		}
	}
</style>
