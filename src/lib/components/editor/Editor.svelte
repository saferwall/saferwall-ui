<script lang="ts">
	import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
	import type { EditorView } from 'codemirror';
	import CodeMirror from 'svelte-codemirror-editor';
	import { EditorState, EditorSelection, Text } from "@codemirror/state";
	import BoldIcon from "$lib/components/editor/icons/BoldIcon.svelte";
	import CodeIcon from '$lib/components/editor/icons/CodeIcon.svelte';
	import HeadingIcon from '$lib/components/editor/icons/HeadingIcon.svelte';
	import ItalicIcon from '$lib/components/editor/icons/ItalicIcon.svelte';
	import StrikethroughIcon from '$lib/components/editor/icons/StrikethroughIcon.svelte';
	import QuoteIcon from '$lib/components/editor/icons/QuoteIcon.svelte';
	import LinkIcon from '$lib/components/editor/icons/LinkIcon.svelte';
	import ListBulletedIcon from '$lib/components/editor/icons/ListBulletedIcon.svelte';
	import ListNumberedIcon from '$lib/components/editor/icons/ListNumberedIcon.svelte';
	import ListTaskIcon from '$lib/components/editor/icons/ListTaskIcon.svelte';
	import Viewer from "../cards/comments/Viewer.svelte";
	export let value: string;
	
	let view: EditorView;
	let state: () => EditorState;
	let doc: () => Text;
</script>

<div class="w-full flex flex-col border rounded">
	<div class="controls p-1">
		<button
			class="control"
			on:click={() => {
				const insert = "# ";
				view.dispatch(
					state().changeByRange((range) => {
						return {
							range: EditorSelection.range(range.from + insert.length, range.to + insert.length),
							changes: {
								from: doc().lineAt(range.from).from,
								insert
							}
						};
					})
				);
				view.focus();
			}}
		>
			<HeadingIcon />
		</button>
		<button
			class="control"
			on:click={() => {
				const insert = "## ";
				view.dispatch(
					state().changeByRange((range) => {
						return {
							range: EditorSelection.range(range.from + insert.length, range.to + insert.length),
							changes: {
								from: doc().lineAt(range.from).from,
								insert
							}
						};
					})
				);
				view.focus();
			}}
		>
			<div class="scale-75">
				<HeadingIcon />
			</div>
		</button>
		<button
			class="control"
			on:click={() => {
				const insert = "### ";
				view.dispatch(
					state().changeByRange((range) => {
						return {
							range: EditorSelection.range(range.from + insert.length, range.to + insert.length),
							changes: {
								from: doc().lineAt(range.from).from,
								insert
							}
						};
					})
				);
				view.focus();
			}}
		>
			<div class="scale-50">
				<HeadingIcon />
			</div>
		</button>
		<button
			class="control"
			on:click={() => {
				view.dispatch(
					state().changeByRange((range) => {
						let insert = `**${doc().sliceString(range.from, range.to)}**`;
						return {
							range: EditorSelection.range(range.from + 2, range.to + 2),
							changes: {
								from: range.from,
								to: range.to,
								insert
							}
						};
					})
				);
				view.focus();
			}}
		>
			<BoldIcon />
		</button>
		<button
			class="control"
			on:click={() => {
				view.dispatch(
					state().changeByRange((range) => {
						let insert = `_${doc().sliceString(range.from, range.to)}_`;
						return {
							range: EditorSelection.range(range.from + 1, range.to + 1),
							changes: {
								from: range.from,
								to: range.to,
								insert
							}
						};
					})
				);
				view.focus();
			}}
		>
			<ItalicIcon />
		</button>
		<button
			class="control"
			on:click={() => {
				view.dispatch(
					state().changeByRange((range) => {
						let insert = `~~${doc().sliceString(range.from, range.to)}~~`;
						return {
							range: EditorSelection.range(range.from + 2, range.to + 2),
							changes: {
								from: range.from,
								to: range.to,
								insert
							}
						};
					})
				);
				view.focus();
			}}
		>
			<StrikethroughIcon />
		</button>
		<button
			class="control"
			on:click={() => {
				view.dispatch(
					state().changeByRange((range) => {
						let firstLine = doc().lineAt(range.from).number;
						let lastLine = doc().lineAt(range.to).number;
						let numLines = lastLine - firstLine + 1;
						return {
							range: EditorSelection.range(range.from + 2, range.to + 2 * numLines),
							changes: Array.from({ length: numLines })
								.map((_, index) => index + firstLine)
								.map((line) => {
									return {
										from: doc().line(line).from,
										insert: '> '
									};
								})
						};
					})
				);
				view.focus();
			}}
		>
			<QuoteIcon />
		</button>
		<button
			class="control"
			on:click={() => {
				view.dispatch(
					state().changeByRange((range) => {
						let insert = `\`${doc().sliceString(range.from, range.to)}\``;
						return {
							range: EditorSelection.range(range.from + 1, range.to + 1),
							changes: {
								from: range.from,
								to: range.to,
								insert
							}
						};
					})
				);
				view.focus();
			}}
		>
			<CodeIcon />
		</button>
		<button
			class="control"
			on:click={() => {
				view.dispatch(
					state().changeByRange((range) => {
						let insert = `[${doc().sliceString(range.from, range.to)}]()`;
						return {
							range: EditorSelection.cursor(range.to + 3),
							changes: {
								from: range.from,
								to: range.to,
								insert
							}
						};
					})
				);
				view.focus();
			}}
		>
			<LinkIcon />
		</button>
		<button
			class="control"
			on:click={() => {
				view.dispatch(
					state().changeByRange((range) => {
						let firstLine = doc().lineAt(range.from).number;
						let lastLine = doc().lineAt(range.to).number;
						let numLines = lastLine - firstLine + 1;
						return {
							range: EditorSelection.range(range.from + 2, range.to + 2 * numLines),
							changes: Array.from({ length: numLines })
								.map((_, index) => index + firstLine)
								.map((line) => {
									return {
										from: doc().line(line).from,
										insert: '- '
									};
								})
						};
					})
				);
				view.focus();
			}}
		>
			<ListBulletedIcon />
		</button>
		<button
			class="control"
			on:click={() => {
				view.dispatch(
					state().changeByRange((range) => {
						let firstLine = doc().lineAt(range.from).number;
						let lastLine = doc().lineAt(range.to).number;
						let numLines = lastLine - firstLine + 1;
						let changes = Array.from({ length: numLines })
							.map((_, index) => index + firstLine)
							.map((line, index) => {
								let insert = `${index + 1}. `;
								return {
									from: doc().line(line).from,
									insert
								};
							});
						return {
							range: EditorSelection.range(
								range.from + 3,
								range.to + changes.reduce((prev, change) => prev + change.insert.length, 0)
							),
							changes
						};
					})
				);
				view.focus();
			}}
		>
			<ListNumberedIcon />
		</button>
		<button

			class="control"
			on:click={() => {
				view.dispatch(
					state().changeByRange((range) => {
						let firstLine = doc().lineAt(range.from).number;
						let lastLine = doc().lineAt(range.to).number;
						let numLines = lastLine - firstLine + 1;
						return {
							range: EditorSelection.range(range.from + 6, range.to + 6 * numLines),
							changes: Array.from({ length: numLines })
								.map((_, index) => index + firstLine)
								.map((line) => {
									return {
										from: doc().line(line).from,
										insert: '- [ ] '
									};
								})
						};
					})
				);
				view.focus();
			}}
		>
			<ListTaskIcon />
		</button>
	</div>
	<div class="w-full flex *:grow-0 *:w-[50%] border-t min-h-48 items-stretch">
		<CodeMirror
			nodebounce={true}
			on:ready={(e) => {
				view = e.detail;
				state = () => view.state;
				doc = () => state().doc;
			}}
			class="max-w-full [&_.cm-gutter]:h-full [&_.cm-content]:h-full [&_.cm-editor]:h-full border-r"
			bind:value
			lang={markdown({ base: markdownLanguage })}
		/>
		<div class="preview">
			<Viewer {value}></Viewer>
		</div>
	</div>
</div>

<style lang="postcss">
	.control {
		@apply p-0 w-7 h-7 inline-flex items-center justify-center text-primary-600 border hover:border-gray-300 rounded;
	}
</style>
