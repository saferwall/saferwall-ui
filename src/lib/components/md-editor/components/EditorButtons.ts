import { EditorSelection, SelectionRange, type EditorState, type Text } from "@codemirror/state";
import type { EditorView } from "codemirror";
import type { Root } from "mdast";
import type { Node } from "mdast";
import { EXIT, SKIP, visit } from "unist-util-visit";
import type { KeyBinding } from "@codemirror/view";
import { writable, type Writable } from "svelte/store";

export const keyBindings: Writable<KeyBinding[]> = writable([]);

export function createHeading(view: EditorView, state: () => EditorState, doc: () => Text, increment = true) {
	let insertFunction = (repeat = 1) => "#".repeat(repeat) + " ".repeat(+!!repeat);
	view.dispatch(
		state().changeByRange((range) => {
			let line = doc().lineAt(range.from).text;
			let skipIdentifiers = line.match(/^(?<leadingIdentifiers>(((>)|([1-9][0-9]*\. )|([\-+*] )|( ))*))(?<hashtagsWithSpace>((?<hashtags>#*) ?))/);
			let { hashtags, hashtagsWithSpace, leadingIdentifiers } = skipIdentifiers?.groups ?? {};
			let newLength = (Math.min(hashtags.length, 6) + (+increment * 2 - 1)) % 7;
			if (newLength < 0) {
				newLength = 6;
			}
			let insert = insertFunction(newLength);
			if (leadingIdentifiers.length && leadingIdentifiers[leadingIdentifiers.length - 1] === ">") {
				insert = " " + insert;
			}
			let lineAt = doc().lineAt(range.from);
			let lineStart = lineAt.from;
			let from = lineStart + leadingIdentifiers.length;
			let to = lineStart + leadingIdentifiers.length + hashtagsWithSpace.length;
			let delta = insert.length - hashtagsWithSpace.length;
			return {
				range: EditorSelection.range(
					range.from + (range.from - lineStart > leadingIdentifiers.length ? delta : 0),
					range.to + (range.to - lineStart > leadingIdentifiers.length ? delta : 0),
				),
				changes: {
					from,
					to,
					insert,
				},
			};
		}),
	);
	view.focus();
}

export function createInlineElementSandwhich(sandwhichBetween: string, view: EditorView, state: () => EditorState, doc: () => Text) {
	view.dispatch(
		state().changeByRange((range) => {
			let lineAt = doc().lineAt(range.from);
			if (lineAt.from !== doc().lineAt(range.to).from) {
				// multiline
				return { range };
			}
			if (range.from === range.to) {
				let lineText = lineAt.text;
				let lineLeft = lineText.substring(0, range.from - lineAt.from);
				let lineRight = lineText.substring(range.from - lineAt.from);
				range = EditorSelection.range(range.from - [...(lineLeft.match(/\w*$/) ?? [])][0].length, range.from + [...(lineRight.match(/^\w*/) ?? [])][0].length);
			}
			let leftBreadSlice = doc().sliceString(Math.max(0, range.from - sandwhichBetween.length), range.from);
			let rightBreadSlice = doc().sliceString(range.to, Math.min(doc().length, range.to + sandwhichBetween.length));
			let insides = doc().sliceString(range.from, range.to);
			if (leftBreadSlice === sandwhichBetween && rightBreadSlice === sandwhichBetween) {
				// un-sandwhich
				let insert = insides;
				return {
					range: EditorSelection.range(
						range.from - sandwhichBetween.length,
						range.to - sandwhichBetween.length,
					),
					changes: {
						from: range.from - sandwhichBetween.length,
						to: range.to + sandwhichBetween.length,
						insert,
					},
				};
			}
			else {
				// sandwhich
				let insert = `${sandwhichBetween}${insides}${sandwhichBetween}`;
				console.log({ insert, range: doc().sliceString(range.from, range.to)})
				return {
					range: EditorSelection.range(
						range.from + sandwhichBetween.length,
						range.to + sandwhichBetween.length,
					),
					changes: {
						from: range.from,
						to: range.to,
						insert,
					},
				};
			}
		}),
	);
	view.focus();
}

/*
	desired behavior
	se: sandwhiched element
	selection start is not inside a se, same for the end
	selection start is inside a se, same for the end, same se
	selection start is inside a se, same for the end, same se
*/

function isOffsetInsideElementOfType(offset: number, tree: Root, type: string):
{ node: Node, found: true} | { node: undefined, found: false } {
	let found = false;
	let node: Node | undefined = undefined;
	visit(tree, (currentNode) => {
		let { position } = currentNode;
		if (position === undefined)
			return SKIP;
		let { offset: endOffset } = position.end;
		let { offset: startOffset } = position.start;
		if (endOffset === undefined || startOffset === undefined)
			return SKIP;
		if (endOffset < offset)
			return SKIP;
		if (startOffset > offset)
			return EXIT;
		if (currentNode.type === type) {
			node = currentNode
			found = true;
			return EXIT;
		}
	})
	return {
		node,
		found,
	}
}

export function textToElement(tree: Root, element: string, view: EditorView, state: () => EditorState, doc: () => Text) {
	view.dispatch(
		state().changeByRange((range) => {
			console.log(
				{
					rf: isOffsetInsideElementOfType(range.from, tree, element),
					rt: isOffsetInsideElementOfType(range.to, tree, element)
				}
			)
			return {
				range
			}
		})
	);
	view.focus();

}