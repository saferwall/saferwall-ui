<script lang="ts">
	import '../css/index.css';
	import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
	import type { EditorView } from 'codemirror';
	import { type Extension } from '@codemirror/state';
	import Viewer from './WorkerViewer.svelte';
	import CodeMirror, { type ThemeSpec } from './CodeMirror.svelte';
	import { systemPrefersDarkMode, type ColorTheme } from '../util.ts';
	import EditorButtons from './EditorButtons.svelte';
	import { vscodeDarkInit, vscodeLightInit } from '@uiw/codemirror-theme-vscode';
	import { tags } from '@lezer/highlight';
	import { twMerge } from 'tailwind-merge';
	import { onMount } from 'svelte';
	import interact from 'interactjs';
	import { browser } from '$app/environment';
	import type { Interactable } from '@interactjs/types';

	export let value: string;
	export let theme: ColorTheme = 'system';
	export let show: (typeof views)[number] = 'split';

	export let basic = true;

	export let useTab = true;
	export let tabSize = 4;
	export let styles: ThemeSpec | null | undefined = undefined;
	export let lineWrapping = false;
	export let editable = true;
	export let readonly = false;
	export let placeholder: string | HTMLElement | null | undefined = undefined;

	export let debounce = false;
	export let debounceTimeInMs = 100;
	export let extensions: Extension[] = [];

	$: realTheme =
		theme !== 'system'
			? theme
			: (['light', 'dark'] as const)[Number($systemPrefersDarkMode.matches)];

	const vscLight = vscodeLightInit({
					settings: {
						lineHighlight: '#f0f0f07f',
						selectionMatch: '#f0f0f0',
						fontFamily: 'JetBrains Mono',
						fontSize: '14px'
					}
				});
	const vscDark = vscodeDarkInit({
					settings: {
						background: 'transparent',
						gutterBackground: 'transparent',
						fontFamily: 'JetBrains Mono',
						fontSize: '14px'
					},
					styles: [
						{
							tag: [tags.heading],
							fontWeight: 'bold',
							color: '#4fc1ff'
						},
						{
							tag: [
								tags.special(tags.string),
								tags.processingInstruction,
								tags.string,
								tags.inserted
							],
							color: '#ce9178'
						}
					]
				});
	$: exts = [
		...extensions,
		(realTheme === 'light'
			? vscLight
			: vscDark)
	];

	let viewEl: HTMLElement;
	let editorEl: HTMLDivElement;
	let containerEl: HTMLElement;
	let borderBox: ResizeObserverSize[];

	let tWidth = 50;

	const resizeMargin = 9;
	let resizable: Interactable;
	let mounted = false;

	$: {
		if (mounted && browser) {
			resizable = interact(viewEl).resizable({
				// resize from all edges and corners
				edges: { left: true, right: false, bottom: false, top: false },
				margin: resizeMargin - 1,
				listeners: {
					move(
						event: Event & {
							rect: { width: number; height: number };
							deltaRect: { left: number; top: number };
						}
					) {
						event.preventDefault();
						tWidth = (event.rect.width * 100) / borderBox[0].inlineSize;
						// viewEl.style.width = tWidth + '% !important';
						// editorEl.style.width = 100 - tWidth + '% !important';
					}
				},
				modifiers: [
					// keep the edges inside the parent
					interact.modifiers.restrictEdges({
						outer: 'parent'
					}),

					// minimum size
					interact.modifiers.restrictSize({
						min: { width: 100, height: 0 },
						max: {
							get width() {
								return borderBox[0].inlineSize - 100;
							},
							height: Infinity
						}
					})
				]
			});
		}
	}
	$: {
		if (mounted && browser) {
			console.log({borderBox});
			resizable.resizable(show === 'split');
		}
	}
	onMount(() => {
		mounted = true;
	});

	const views = ['split', 'editor', 'viewer'] as const;
	const viewNames = ['split', 'editor', 'preview'] as const;
	let Class = '';
	let view: EditorView;

	export { Class as class };
</script>

<div
	class="w-full flex flex-col border rounded overflow-clip bg-secondary-surface"
>
	<div class="controls p-1 flex gap-0.5 items-stretch justify-between flex-wrap bg-tertiary-surface">
		<div style="visibility: {show === 'viewer' ? 'hidden' : 'visible'};">
			<EditorButtons {view}></EditorButtons>
		</div>
		<div class="split flex items-center gap-0.5 flex-wrap">
			{#each viewNames as v, index}
				<button
					class="border-none flex items-center justify-center split-button text-center px-2 py-0.5 rounded-sm {show ===
					views[index]
						? 'selected'
						: ''}"
					on:click={() => {
						show = views[index];
					}}
				>
					{v[0].toUpperCase() + v.slice(1)}
				</button>
			{/each}
		</div>
	</div>
	<div
		bind:this={containerEl}
		bind:borderBoxSize={borderBox}
		class="w-full flex *:grow-0 {show === 'split'
			? '*:w-[50%]'
			: '*:!w-full'} border-t min-h-48 items-stretch"
	>
		{#if show !== 'viewer'}
			<!-- <div class="cm_wrapper h-full self-stretch" bind:this={editorEl}> -->
			<CodeMirror
				style="width: {show !== "editor" ? 100 - tWidth : 100}% !important;"
				bind:element={editorEl}
				on:ready={(e) => {
					view = e.detail;
				}}
				class={twMerge(
					`
							text-base [font-variant-ligatures:none] 
							[&_.cm-lineNumbers_.cm-gutterElement]:!min-w-[5ch]
							[&_.cm-lineNumbers_.cm-gutterElement]:font-bold
							[&_.cm-placeholder]:!text-slate-500 
							[&_.cm-placeholder]:dark:!text-slate-300
							[&_.cm-gutters]:bg-secondary-surface
						`,
					'max-w-full [&_.cm-gutter]:h-full [&_.cm-content]:h-full [&_.cm-editor]:h-full',
					Class
				)}
				lang={markdown({ base: markdownLanguage })}
				bind:extensions={exts}
				bind:value
				bind:editable
				bind:placeholder
				bind:readonly
				bind:basic
				bind:useTab
				bind:tabSize
				bind:lineWrapping
				bind:styles
				bind:debounce
				bind:debounceTimeInMs
			/>
			<!-- </div> -->
		{/if}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div style="display: {show !== 'editor' ? 'flex' : 'none'}; width: {show !== "viewer" ? tWidth : 100}% !important;" class="preview" bind:this={viewEl}>
			{#if show === 'split'}
				<div
					class="sep h-full flex justify-center hover:bg-black dark:hover:bg-white [&:hover_>_*]:border-transparent transition-colors duration-300"
					style="flex-basis: {resizeMargin}px"
				>
					<div class="bar border-l"></div>
				</div>
			{/if}
			<Viewer class="flex-grow basis-0" {theme} {value}></Viewer>
		</div>
	</div>
</div>

<style lang="postcss">
	* {
		@apply border-primary-border;
	}
	.split-button {
		@apply 
			tracking-[0.020em]
			text-tertiary-text
			hover:text-primary-text
			h-full
			;
		&.selected {
			@apply font-semibold
				text-white
				bg-brand-surface
				tracking-[0.0015em];
		}
	}
</style>
