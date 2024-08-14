<script lang="ts">
	import type { PageData } from './$types';
	import { systemPrefersDarkMode, Theme, theme } from "$lib/stores/theme";
	import 'github-markdown-css/github-markdown-light.css';

	import Card from '$lib/components/Card.svelte';
	import CommentCard from '$lib/components/cards/comments/CommentCard.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Editor from '$lib/components/editor/Editor.svelte';
	import { vscodeDarkInit, vscodeLightInit } from '@uiw/codemirror-theme-vscode';
	import { tags } from '@lezer/highlight';

	export let data: PageData;

	$: comments = data.pagination.items;
	$: isLight = $theme !== Theme.SYSTEM ? ($theme === Theme.LIGHT) : !$systemPrefersDarkMode.matches;

	let comment = '';
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
			isLight ? 
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
			<Button class="grow md:grow-0" size="sm">Comment</Button>
		</div>
	</Card>
</section>

<style lang="postcss">
</style>
