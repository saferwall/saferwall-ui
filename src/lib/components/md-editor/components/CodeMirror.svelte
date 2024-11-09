<script lang="ts" context="module">
	export type ThemeSpec = Record<string, StyleSpec>;
	export type StyleSpec = {
		[propOrSelector: string]: string | number | StyleSpec | null;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, getContext, onDestroy, onMount } from "svelte";
	import {
		EditorView,
		keymap,
		placeholder as placeholderExt,
	} from "@codemirror/view";
	import {
		EditorState,
		StateEffect,
		type Extension,
	} from "@codemirror/state";
	import { indentWithTab } from "@codemirror/commands";
	import { indentUnit, type LanguageSupport, foldGutter } from "@codemirror/language";
	import { debounce as fDebounce } from "../util.ts";
	import { lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine } from '@codemirror/view';
	import { indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap } from '@codemirror/language';
	import { history, defaultKeymap, historyKeymap, } from '@codemirror/commands';
	import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
	import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
	import { lintKeymap } from '@codemirror/lint';
	import type { KeyBinding } from "@codemirror/view";
    import { keyBindings } from "./EditorButtons.ts";

	let classes = "";
	export { classes as class };
	export let value: string | null | undefined = "";
	export let style = "";

	export let basic = true;
	export let lang: LanguageSupport | null | undefined = undefined;
	export let theme: Extension | null | undefined = undefined;
	export let extensions: Extension[] = [];

	export let useTab = true;
	export let tabSize = 4;

	export let styles: ThemeSpec | null | undefined = undefined;
	export let lineWrapping = false;
	export let editable = true;
	export let readonly = false;
	export let placeholder: string | HTMLElement | null | undefined = undefined;

	export let debounce = false;
	export let debounceTimeInMs = 100;

	const is_browser = true;
	const dispatch = createEventDispatcher<{
		change: string;
		ready: EditorView;
		reconfigure: EditorView;
	}>();

	export let element: HTMLDivElement | undefined = undefined;
	let view: EditorView;

	let update_from_prop = false;
	let update_from_state = false;
	let first_config = true;
	let first_update = true;

	$: state_extensions = [
		...get_base_extensions(
			basic,
			useTab,
			tabSize,
			lineWrapping,
			placeholder,
			editable,
			readonly,
			lang,
		),
		...get_theme(theme, styles),
		...extensions,
	];

	$: view && update(value);
	$: view && state_extensions && reconfigure();

	$: on_change = debounce
		? fDebounce(handle_change, debounceTimeInMs)
		: handle_change;

	onMount(() => {
		view = create_editor_view();
		dispatch("ready", view);
	});
	onDestroy(() => view?.destroy());

	function create_editor_view(): EditorView {
		return new EditorView({
			parent: element,
			state: create_editor_state(value),
			dispatch(transaction) {
				view.update([transaction]);
						if (!update_from_prop && transaction.docChanged) {
					on_change();
				}
			},
		});
	}

	function reconfigure(): void {
		if (first_config) {
			first_config = false;
			return;
		}
		view.dispatch({
			effects: StateEffect.reconfigure.of(state_extensions),
		});
		dispatch("reconfigure", view);
	}

	function update(value: string | null | undefined): void {
		if (first_update) {
			first_update = false;
			return;
		}
		if (update_from_state) {
			update_from_state = false;
			return;
		}
		update_from_prop = true;
		view.setState(create_editor_state(value));
		update_from_prop = false;
	}

	function handle_change(): void {
		const new_value = view.state.doc.toString();
		if (new_value === value) return;
		update_from_state = true;
		value = new_value;
		dispatch("change", value);
	}

	function create_editor_state(
		value: string | null | undefined,
	): EditorState {
		return EditorState.create({
			doc: value ?? undefined,
			extensions: state_extensions,
		});
	}
	
	let dummy = document.createElement("div");

	function toHTML(dom: string) {
		dummy.innerHTML = dom;
		return dummy.children[0].cloneNode(true) as HTMLElement;
	}

	const kb: KeyBinding[] = $keyBindings;

	const basicSetup = (() => [
		lineNumbers(),
		highlightActiveLineGutter(),
		highlightSpecialChars(),
		history(),
		foldGutter({
			markerDOM: (open) => {
				return toHTML(`<span title="${open ? "Fold line" : "Unfold line"}"
									style=
										"
											transform: rotate(${Number(open) * 90}deg);
											display: inline-block;
											font-weight: bold;
											user-select: none
										"
								>
									›
								</span>`)
			}
		}),
		drawSelection(),
		dropCursor(),
		EditorState.allowMultipleSelections.of(true),
		indentOnInput(),
		syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
		bracketMatching(),
		closeBrackets(),
		autocompletion(),
		rectangularSelection(),
		crosshairCursor(),
		highlightActiveLine(),
		highlightSelectionMatches(),
		keymap.of([
			...kb,
			...closeBracketsKeymap,
			...defaultKeymap,
			...searchKeymap,
			...historyKeymap,
			...foldKeymap,
			...completionKeymap,
			...lintKeymap,
		])
	])();

	function get_base_extensions(
		basic: boolean,
		useTab: boolean,
		tabSize: number,
		lineWrapping: boolean,
		placeholder: string | HTMLElement | null | undefined,
		editable: boolean,
		readonly: boolean,
		lang: LanguageSupport | null | undefined,
	): Extension[] {
		const extensions: Extension[] = [
			indentUnit.of(" ".repeat(tabSize)),
			EditorView.editable.of(editable),
			EditorState.readOnly.of(readonly),
		];
		if (basic) extensions.push(basicSetup);
		if (useTab) extensions.push(keymap.of([indentWithTab]));
		if (placeholder) extensions.push(placeholderExt(placeholder));
		if (lang) extensions.push(lang);
		if (lineWrapping) extensions.push(EditorView.lineWrapping);
		return extensions;
	}

	function get_theme(
		theme: Extension | null | undefined,
		styles: ThemeSpec | null | undefined,
	): Extension[] {
		const extensions: Extension[] = [];
		if (styles) extensions.push(EditorView.theme(styles));
		if (theme) extensions.push(theme);
		return extensions;
	}
</script>

{#if is_browser}
	<div class="codemirror-wrapper !font-jetbrains-mono {classes}" bind:this={element} {style} />
{:else}
	<div class="scm-waiting {classes}">
		<div class="scm-waiting__loading scm-loading">
			<div class="scm-loading__spinner" />
			<p class="scm-loading__text">Loading editor...</p>
		</div>
		<pre class="scm-pre cm-editor">{value}</pre>
	</div>
{/if}

<style>
	.codemirror-wrapper :global(.cm-focused) {
		outline: none;
	}

	.scm-waiting {
		position: relative;
	}
	.scm-waiting__loading {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.scm-loading {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.scm-loading__spinner {
		width: 1rem;
		height: 1rem;
		border-radius: 100%;
		border: solid 2px #000;
		border-top-color: transparent;
		margin-right: 0.75rem;
		animation: spin 1s linear infinite;
	}
	.scm-loading__text {
		font-family: sans-serif;
	}
	.scm-pre {
		font-size: 0.85rem;
		font-family: monospace;
		tab-size: 2;
		-moz-tab-size: 2;
		resize: none;
		pointer-events: none;
		user-select: none;
		overflow: auto;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
