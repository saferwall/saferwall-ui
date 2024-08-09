<script lang="ts">
	import type { PageData } from './$types';
	import { isLight } from "$lib/stores/theme";
	import 'github-markdown-css/github-markdown-light.css';

	import Card from '$lib/components/Card.svelte';
	import CommentCard from '$lib/components/cards/comments/CommentCard.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Editor from '$lib/components/editor/Editor.svelte';
	import { vscodeDarkInit, vscodeLightInit } from '@uiw/codemirror-theme-vscode';
	import { tags } from '@lezer/highlight';
	import NProgress from 'nprogress';
	import { CommentApi, Configuration } from '$lib/api';
	import { goto, invalidateAll } from '$app/navigation';


	NProgress.configure({
		minimum: 0.16
	});

	export let data: PageData;

	$: comments = data.pagination.items;

	let comment = `
# asdasdasd

asdfasdfasdf

asdfasdfasdf

asdfasdfasdf
	`;
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
		<Editor bind:value={comment}
		extensions={[
			$isLight ? 
			vscodeLightInit({
				settings: {
					lineHighlight: "#f0f0f07f",
					selectionMatch: "#f0f0f0",
				},
			}) :
			vscodeDarkInit({
				styles: [
					{
						tag: [tags.heading],
						fontWeight: "bold",
						color: "#4fc1ff",
					},
					{
						tag: [tags.special(tags.string), tags.processingInstruction, tags.string, tags.inserted],
						color: '#ce9178'
					},
				],
	
			})]}></Editor>
		<div class="w-full flex pt-4">
			<Button class="grow md:grow-0" size="sm" loading={postingComment} on:click={() => {
				if (!data?.session?.token || !data?.session?.username) {
					goto("/auth/login");
					return;
				}
				postingComment = true;
	
				let token = data?.session?.token || "";
				let username = data?.session?.username || "";
				let api = new CommentApi(new Configuration({accessToken: token}));
				NProgress.start();
				api.commentsPost({
					body: comment,
					sha256: data.hash,
					username
				})
				.finally(() => {
					postingComment = false;
				})
				.then(async () => {
					await invalidateAll();
					NProgress.done();
					document.body.scrollIntoView();
				})
				.catch(err => {
					NProgress.done();
					console.error(err);
					goto("/auth/login");
					return;
				})

			}}>Comment</Button>
		</div>
	</Card>
</section>

<style lang="postcss">
</style>
