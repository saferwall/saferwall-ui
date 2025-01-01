<script lang="ts">
	import type { PageData } from "./$types";
	import { isLight, themeString } from "$lib/stores/theme";

	import Card from "$lib/components/Card.svelte";
	import CommentCard from "$lib/components/cards/comments/CommentCard.svelte";
	import Button from "$lib/components/form/Button.svelte";
	import Editor from "$lib/components/md-editor/components/Editor.svelte";
	import { vscodeDarkInit, vscodeLightInit } from "@uiw/codemirror-theme-vscode";
	import { tags } from "@lezer/highlight";
	import NProgress from "nprogress";
	import { CommentApi, Configuration } from "$lib/api";
	import { goto, invalidateAll } from "$app/navigation";
	import { titleExtraStore } from "$lib/utils/fileMenu";
	import { onDestroy, onMount } from "svelte";
	import { browser } from "$app/environment";


	NProgress.configure({
		minimum: 0.16
	});

	export let data: PageData;

	$: comments = data.pagination.items;
	$: $titleExtraStore = ` (${comments.length})`;

	let mounted = false;
	onMount(() => {
		mounted = true;
	})

	onDestroy(() => {
		$titleExtraStore = "";
	})

	let comment = "";
	let postingComment = false;
</script>

<section class="file__comments container mx-auto space-y-4">
	{#each comments as comment}
		<CommentCard {...comment} />
	{/each}
	{#if comments.length === 0}
		<div class="flex-center py-12">
			<p class="text-tertiary-text">No comments available.</p>
		</div>
	{/if}
	<Card spacing={false}>
		{#if browser && mounted}
			<Editor bind:value={comment} theme={$themeString} placeholder="Add your comment here..."></Editor>
		{/if}
		<div class="w-full flex pt-4">
			<Button class="grow md:grow-0" size="sm" loading={postingComment} disabled={!comment} title="{comment ? "" : "Cannot post an empty comment"}" on:click={() => {
				if (!data?.session?.token || !data?.session?.username) {
					goto("/auth/login");
					return;
				}
				if (!comment) return;
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
					comment = "";
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
