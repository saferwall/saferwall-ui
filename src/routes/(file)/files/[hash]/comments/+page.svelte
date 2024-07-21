<script lang="ts">
	import type { PageData } from './$types';
	import CommentCard from '$lib/components/cards/comments/CommentCard.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Editor from '$lib/components/editor/Editor.svelte';
	import { CommentApi } from '$lib/api';
	import { goto } from '$app/navigation';


	export let data: PageData;

	$: comments = data.pagination.items;

	let comment = "";
	let postingComment = false;
</script>

<section class="file__comments container mx-auto space-y-4">
	{#each comments as comment}
		<CommentCard {...comment} />
	{/each}
	{#if comments.length === 0}
		<div class="flex-center py-12">
			<p class="text-neutral-500">No comments available</p>
		</div>
	{/if}
	<Card spacing={false}>
		<Editor bind:value={comment}></Editor>
		<div class="w-full flex pt-4">
			<Button class="grow md:grow-0" size="sm" theme="gray" loading={postingComment} on:click={() => {
				if (!data?.session?.token) {
					goto("/auth/login");
				}
				postingComment = true;
				let api = new CommentApi({accessToken: data.session.token, isJsonMime: (mime) => mime === "application/json"});
				api.commentsPost({
					body: comment,
					sha256: data.hash,
					username: data.session.username
				}, {
					headers: {
						"Authorization": `Bearer ${data.session.token}`,
						"Content-Type": "application/json"
					}
				}).then(res => {
					console.log({res});
				}).catch(err => {
					console.log({err});
				}).finally(() => {
					postingComment = false;
				})
			}}>Comment</Button>
		</div>
	</Card>
</section>

<style lang="postcss">
	.file__comments {
		
	}
</style>
