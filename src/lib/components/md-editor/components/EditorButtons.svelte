<script lang="ts">
	import { EditorSelection, Transaction } from "@codemirror/state";
	import type { EditorView } from "codemirror";
	import HeadingIcon from "./icons/HeadingIcon.svelte";
	import BoldIcon from "./icons/BoldIcon.svelte";
	import CodeIcon from "./icons/CodeIcon.svelte";
	import ItalicIcon from "./icons/ItalicIcon.svelte";
	import StrikethroughIcon from "./icons/StrikethroughIcon.svelte";
	import QuoteIcon from "./icons/QuoteIcon.svelte";
	import LinkIcon from "./icons/LinkIcon.svelte";
	import ListBulletedIcon from "./icons/ListBulletedIcon.svelte";
	import ListNumberedIcon from "./icons/ListNumberedIcon.svelte";
	import ListTaskIcon from "./icons/ListTaskIcon.svelte";
    import { createHeading, createInlineElementSandwhich, keyBindings, textToElement } from "./EditorButtons.ts";
    import { onMount, setContext } from "svelte";
    import { WorkerWrapper } from "../worker_wrapper.ts";
	import Worker from "../editor_worker.ts?worker";
	import type { Root } from "mdast";
	import type { KeyBinding } from "@codemirror/view";

	export let view: EditorView;
	// export let value: string;

	$: state = () => view.state;
	$: doc = () => state().doc;

	// let worker: WorkerWrapper<string, string>
	// let tree: Root;

	// $: worker?.postMessage(value);

	function createHeadingHandler(increment = true) {
		createHeading(view, state, doc, increment);
	}

	function makeBold() {
		// textToElement(tree, "strong", view, state, doc);
		createInlineElementSandwhich("__", view, state, doc);
	}

	function makeItalic() {
		createInlineElementSandwhich("*", view, state, doc);
	}

	function makeStrikeThrough() {
		createInlineElementSandwhich("~~", view, state, doc);
	}
	
	let map: Record<string, () => void> = {
		h: () => { createHeadingHandler(false) },
		H: () => { createHeadingHandler(true) },
		b: makeBold,
		i: makeItalic,
		s: makeStrikeThrough,
	}

	$keyBindings = Object.entries(map).map(([key, value]) => {
		return {
			key: `Mod-${key}`,
			run: () => {
				value();
				return true;
			},
			preventDefault: true,
			stopPropagation: true,
		}
	});

	// onMount(() => {
	// 	worker = new WorkerWrapper(Worker);
	// 	worker.onmessage = (e) => {
	// 		tree = JSON.parse(e.data);
	// 	}
	// 	return () => {
	// 		worker?.terminate();
	// 	}
	// })
</script>

<div class="editor-buttons flex items-center gap-0.5 flex-wrap">
	<button
		class="control"
		on:click={() => createHeadingHandler()}
		title=
"
Increase Heading (CTRL + h)
Decrease Heading (CTRL + H)
"
	>
		<HeadingIcon />
	</button>
	<!-- <button
		class="control"
		on:click={() => {
			const insert = "## ";
			view.dispatch(
				state().changeByRange((range) => {
					return {
						range: EditorSelection.range(
							range.from + insert.length,
							range.to + insert.length,
						),
						changes: {
							from: doc().lineAt(range.from).from,
							insert,
						},
					};
				}),
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
						range: EditorSelection.range(
							range.from + insert.length,
							range.to + insert.length,
						),
						changes: {
							from: doc().lineAt(range.from).from,
							insert,
						},
					};
				}),
			);
			view.focus();
		}}
	>
		<div class="scale-50">
			<HeadingIcon />
		</div>
	</button> -->
	<button
		class="control"
		on:click={() => {
			makeBold();
		}}
		title="Bold (CTRL + b)"
	>
		<BoldIcon />
	</button>
	<button
		class="control"
		on:click={() => makeItalic()}
		title="Italic (CTRL + i)"
	>
		<ItalicIcon />
	</button>
	<button
		class="control"
		on:click={() => makeStrikeThrough()}
		title="Strike-through (CTRL + s)"
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
						range: EditorSelection.range(
							range.from + 2,
							range.to + 2 * numLines,
						),
						changes: Array.from({ length: numLines })
							.map((_, index) => index + firstLine)
							.map((line) => {
								return {
									from: doc().line(line).from,
									insert: "> ",
								};
							}),
					};
				}),
			);
			view.focus();
		}}
		title="Quote"
	>
		<QuoteIcon />
	</button>
	<button
		title="Code"
		class="control"
		on:click={() => createInlineElementSandwhich("`", view, state, doc)}
	>
		<CodeIcon />
	</button>
	<button
		title="Link"
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
							insert,
						},
					};
				}),
			);
			view.focus();
		}}
	>
		<LinkIcon />
	</button>
	<button
		title="Unordered List"
		class="control"
		on:click={() => {
			view.dispatch(
				state().changeByRange((range) => {
					let firstLine = doc().lineAt(range.from).number;
					let lastLine = doc().lineAt(range.to).number;
					let numLines = lastLine - firstLine + 1;
					return {
						range: EditorSelection.range(
							range.from + 2,
							range.to + 2 * numLines,
						),
						changes: Array.from({ length: numLines })
							.map((_, index) => index + firstLine)
							.map((line) => {
								return {
									from: doc().line(line).from,
									insert: "- ",
								};
							}),
					};
				}),
			);
			view.focus();
		}}
	>
		<ListBulletedIcon />
	</button>
	<button
		title="Ordered List"
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
								insert,
							};
						});
					return {
						range: EditorSelection.range(
							range.from + 3,
							range.to +
								changes.reduce(
									(prev, change) =>
										prev + change.insert.length,
									0,
								),
						),
						changes,
					};
				}),
			);
			view.focus();
		}}
	>
		<ListNumberedIcon />
	</button>
	<button
		title="Task List"
		class="control"
		on:click={() => {
			view.dispatch(
				state().changeByRange((range) => {
					let firstLine = doc().lineAt(range.from).number;
					let lastLine = doc().lineAt(range.to).number;
					let numLines = lastLine - firstLine + 1;
					return {
						range: EditorSelection.range(
							range.from + 6,
							range.to + 6 * numLines,
						),
						changes: Array.from({ length: numLines })
							.map((_, index) => index + firstLine)
							.map((line) => {
								return {
									from: doc().line(line).from,
									insert: "- [ ] ",
								};
							}),
					};
				}),
			);
			view.focus();
		}}
	>
		<ListTaskIcon />
	</button>
</div>

<style lang="postcss">
	.control {
		@apply p-0
			w-7
			h-7
			inline-flex
			items-center
			justify-center
			border-none
			/* bg-bunker-100 */
			hover:bg-brand-surface
			hover:text-white
			text-secondary-text
			rounded-sm;
	}
</style>