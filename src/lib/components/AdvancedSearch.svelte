<script lang="ts">
	import { onMount } from "svelte";
	import TabsImproved from "./cards/TabsImproved.svelte";
	import Button from "./form/Button.svelte";
	import Input from "./form/Input.svelte";
	import Icon from "./Icon.svelte";
	import {
		Configuration,
		FileApi,
		type FileFileSearchAutocomplete,
		type PaginationPages
	} from "$lib/api";
	import {
		autoCompleteData,
		parseSearch,
		type ConsumerThrow,
		type ParsingResult
	} from "$lib/utils/parseAdvancedSearch";
	import type { Saferwall } from "$lib/types";
	import CheckBox from "./form/CheckBox.v2.svelte";
	import { convertBytes, parseTags, timestampToFormattedDate } from "$lib/utils";
	import type { AxiosError } from "axios";
	import PopUnder from "./partials/PopUnder.svelte";
	import PaginationButtons from "./PaginationButtons.svelte";
	import PaginationPerPageSelect from "./PaginationPerPageSelect.svelte";
	import debounce from "debounce";

	export let advanced: boolean;
	export let session: Saferwall.Session;

	const api = new FileApi(new Configuration({ accessToken: session.token }));

	let search = "";
	let currentSearch = "";
	let lastSearch = "";
	let searchEditHistory = [search];
	let searchEditHistoryIndex = 0;
	function searchEditHistoryPush(...newValues: string[]) {
		let spliced = searchEditHistory.toSpliced(searchEditHistoryIndex + 1);
		newValues = newValues
			.filter((nv, index) => newValues.indexOf(nv) === index)
			.filter((nv, index, arr) => {
				let idx = -1 - index;
				return spliced.at(idx) !== nv;
			});
		if (newValues.length) {
			searchEditHistory = spliced;
			searchEditHistory = [...searchEditHistory, ...newValues];
			searchEditHistoryIndex = searchEditHistory.length - 1;
		}
	}
	function setSearch(nv: string, pushOldValue = true) {
		nv = nv.replace(/\u200B/g, "");
		if (pushOldValue) {
			searchEditHistoryPush(search, nv);
		} else {
			searchEditHistoryPush(nv);
		}
		search = nv;
	}
	let suggestion = "";
	let currentTab = "Search all";
	let perPage = 10;
	let page = 1;

	let pages: PaginationPages | undefined;
	let pagesError = "";

	type PageItem = {
		class: string;
		file_extension: string;
		file_format: string;
		first_seen: number;
		id: string;
		name: string;
		last_scanned: number;
		multiav: {
			hits: number;
			total: number;
		};
		size: number;
		tags: Record<string, string | string[]>;
	};

	function submit() {
		if (currentSearch) {
			console.log("submitted");
			console.log({ currentSearch });
			inputEl.blur();
			inputEl.disabled = true;
			awaitingSearchResults = true;
			api
				.filesSearchPost(perPage, page, {
					data: { query: currentSearch }
				})
				.finally(() => {
					inputEl.disabled = false;
					awaitingSearchResults = false;
					lastSearch = currentSearch;
				})
				.then((res) => {
					console.log(res.data);
					pages = res.data;
					// console.log(JSON.stringify(res.data));
				})
				.catch((err: AxiosError) => {
					console.log(err);
					pages = undefined;
					pagesError = (err.response?.data as any)?.message ?? "";
				});
		}
	}
	function keydown(e: KeyboardEvent) {
		// console.log(`key: ${e.key}`);
		if (e.key.toLowerCase() === "z" && e.ctrlKey) {
			if (!e.shiftKey) {
				// undo
				e.preventDefault();
				// debugger;
				if (search !== searchEditHistory[searchEditHistoryIndex]) {
					searchEditHistoryPush(search);
				}
				searchEditHistoryIndex = Math.max(searchEditHistoryIndex - 1, 0);
				setSearch(searchEditHistory[searchEditHistoryIndex] || "", false);
			} else {
				// redo
				e.preventDefault();
				searchEditHistoryIndex = Math.min(searchEditHistoryIndex + 1, searchEditHistory.length - 1);
				setSearch(searchEditHistory[searchEditHistoryIndex] || "", false);
			}
		}
		if (e.key === "Backspace") {
			searchEditHistoryPush(search);
		}
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			currentSearch = search;
		}
		if (e.key === "Tab") {
			e.preventDefault();
		}
		let limit = () => {
			e.preventDefault();
			selectedSuggestionIndex =
				(selectedSuggestionIndex + suggestionList.length) % (suggestionList.length || 1);
		};
		if (showSuggestions) {
			if (e.key === "ArrowDown") {
				selectedSuggestionIndex++;
				limit();
			} else if (e.key === "ArrowUp") {
				selectedSuggestionIndex--;
				limit();
			}
		}
		if (e.key === "Escape") {
			inputEl.blur();
		}
		if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.key === "Tab") {
			if (suggestionList[selectedSuggestionIndex]) {
				setSearch(suggestionList[selectedSuggestionIndex].value);
			}
		}
	}
	type DeepRequired<T> = T extends object
		? {
				[K in keyof T]-?: T[K] extends Array<infer U> ? Array<DeepRequired<U>> : DeepRequired<T[K]>;
			}
		: T;
	type DeepNullish<T> = T extends object
		? {
				[K in keyof T]?:
					| (T[K] extends Array<infer U> ? Array<DeepNullish<U>> : DeepNullish<T[K]>)
					| null;
			}
		: T;

	function dflt<R extends any, T extends R | undefined | null>(value: T, def: any): R | string {
		return value ? value : def;
	}

	let sug: DeepRequired<FileFileSearchAutocomplete> = { examples: [], search_modifiers: [] };
	$: autoCompleteData.keys = sug.search_modifiers.map((sm) => ({
		value: sm.query,
		description: sm.comment
	}));

	let suggestionList = [] as { value: string; displayValue?: string; description: string }[];
	let suggestionListElements = [] as HTMLElement[];
	let searchFocused = false;
	let res = [] as ResizeObserverEntry[];

	let focusoutTimeout = -1;
	let focusinTimeout = -1;
	let selectedSuggestionIndex = 0;
	let inputEl: HTMLInputElement;
	let sugEl: HTMLInputElement;
	const styleString = `
		:not(#advanced_search, #advanced_search *, *:has( #advanced_search), symbol, symbol *) {
			visibility: hidden !important;
		}
	`;

	$: {
		if (searchFocused) {
			if (search === "") {
				suggestionList = sug.examples.map((e) => ({
					description: e.comment,
					value: e.query
				}));
			} else {
				suggestionList = [];
			}
		} else {
		}
	}
	function contentChanged() {
		if (sugEl && inputEl) {
			sugEl.value = suggestion;
			inputEl.value = search;
			sugEl.style.cssText = "height: auto !important;";
			inputEl.style.cssText = "height: auto !important;";
			let maxHeight = Math.max(sugEl.scrollHeight, inputEl.scrollHeight) + 3;
			sugEl.style.cssText = `height: ${maxHeight}px !important;`;
			inputEl.style.cssText = `height: ${maxHeight}px !important;`;
		}
	}
	let showSuggestions = false;
	let parsingData: {
		parseRes: ParsingResult;
		failedRe: ConsumerThrow;
		restIsSpacesOrEmpty: boolean;
	};
	$: suggestionList, (selectedSuggestionIndex = 0);
	$: search, (showSuggestions = searchFocused && !!suggestionList.length && !awaitingSuggestions);
	$: {
		if (search.trim()) {
			let [parseRes, failedRe] = parseSearch(search);
			// console.log("parseRes", parseRes)
			// console.log("failedRe", failedRe)
			if (!failedRe) {
				failedRe = [search.length, ["logicalOperator"], [""]];
			}
			let [endIndex, tokenNames] = failedRe;
			suggestionList = [];
			let space = search.trimEnd() === search ? " " : "";
			let keyOrGroupSpace = space.repeat(
				+(parseRes.length && parseRes.at(-1)!.type === "logicalOperator")
			);
			let endsWithSpaces = !space;
			// console.log({endsWithSpace})
			let searchRest = search.substring(endIndex);
			let restIsSpacesOrEmpty = !searchRest.trimEnd();

			parsingData = { parseRes, failedRe, restIsSpacesOrEmpty };

			function addSuggestions({
				sourceList,
				search,
				valueStartsWith,
				prefix = "",
				suffix = ""
			}: {
				sourceList: Array<{ value: string; displayValue?: string; description: string }>;
				search: string;
				valueStartsWith?: string;
				prefix?: string;
				suffix?: string;
			}): void {
				if (valueStartsWith) {
					suggestionList.push(
						...sourceList
							.filter(
								(sug) =>
									sug.value.startsWith(valueStartsWith) &&
									sug.value.length !== valueStartsWith.length
							)
							.map((sug) => ({
								...sug,
								displayValue: sug.displayValue || sug.value,
								value:
									search + "\u200B" + prefix + sug.value.substring(valueStartsWith.length) + suffix
							}))
					);
				} else {
					suggestionList.push(
						...sourceList.map((sug) => ({
							...sug,
							displayValue: sug.displayValue || sug.value,
							value: search + "\u200B" + prefix + sug.value + suffix
						}))
					);
				}
			}
			tokenNames.forEach((token) => {
				switch (token) {
					case "key": {
						if (restIsSpacesOrEmpty) {
							addSuggestions({
								sourceList: autoCompleteData.keys,
								search,
								prefix: keyOrGroupSpace
							});
						} else {
							// error, expected key at endIndex
						}
						break;
					}
					case "comparisonOperator": {
						if (restIsSpacesOrEmpty) {
							if (!endsWithSpaces) {
								addSuggestions({
									sourceList: autoCompleteData.keys,
									valueStartsWith: parseRes.at(-1)!.value,
									search
								});
							} else {
								// error, can't autocomplete
							}
							addSuggestions({
								sourceList: autoCompleteData.comparisonOperators,
								search
							});
						} else if (!endsWithSpaces) {
							addSuggestions({
								sourceList: autoCompleteData.comparisonOperators,
								valueStartsWith: searchRest.trimStart(),
								search
							});
						}
						break;
					}
					case "value": {
						if (!endsWithSpaces) {
							addSuggestions({
								sourceList: autoCompleteData.comparisonOperators,
								valueStartsWith: parseRes.at(-1)!.value,
								search
							});
						}
						suggestion = search + "\u200B" + "<value>";
						break;
					}
					case "closingGroupingOperator": {
						if (restIsSpacesOrEmpty) {
							addSuggestions({
								sourceList: [autoCompleteData.groupingOperators[1]],
								search,
								prefix: keyOrGroupSpace
							});
						}
						break;
					}
					case "logicalOperator": {
						if (restIsSpacesOrEmpty) {
							addSuggestions({
								sourceList: autoCompleteData.logicalOperators,
								search,
								prefix: space,
								suffix: " "
							});
						} else if (!endsWithSpaces) {
							addSuggestions({
								sourceList: autoCompleteData.logicalOperators,
								valueStartsWith: searchRest.trimStart(),
								search,
								suffix: " "
							});
						}
						break;
					}
					case "openingGroupingOperator": {
						if (restIsSpacesOrEmpty) {
							addSuggestions({
								sourceList: [autoCompleteData.groupingOperators[0]],
								search,
								prefix: keyOrGroupSpace
							});
						}
						break;
					}
					case "endOfString": {
						break;
					}
				}
			});
			suggestionList = [...suggestionList];
		}
	}
	$: {
		if (searchFocused && suggestionList[selectedSuggestionIndex]) {
			suggestion = suggestionList[selectedSuggestionIndex].value;
		} else if (
			!searchFocused ||
			(searchFocused &&
				!(
					parsingData &&
					parsingData.failedRe[1].includes("value") &&
					parsingData.restIsSpacesOrEmpty
				))
		) {
			suggestion = "";
		}
	}
	let mounted = false;
	onMount(() => {
		mounted = true;
		const ro = new ResizeObserver((r) => {
			res = r;
		});
		ro.observe(sugEl);
		ro.observe(inputEl);
		return () => {
			ro.disconnect();
		};
	});
	function resetSearch() {
		search = "";
		searchEditHistory = [search];
		searchEditHistoryIndex = 0;
		pages = undefined;
	}
	let awaitingSuggestions = false;
	let awaitingSearchResults = false;
	$: inputPlaceholder = suggestion
		? ""
		: awaitingSuggestions
			? "Loading..."
			: "Search hashes, IOCs, AV detections, IPs, domains, and more ...";
	$: {
		if (advanced && mounted) {
			awaitingSuggestions = true;
			api
				.filesSearchAutocompleteGet()
				.then((res) => {
					let { data } = res;
					data.examples = [...(data.examples ?? []).map((e) => ({ query: "", comment: "", ...e }))];
					data.search_modifiers = [
						...(data.search_modifiers ?? []).map((s) => ({ query: "", comment: "", ...s }))
					]
						// temporary fix for duped queries from backend
						.filter((el, index, arr) => arr.find((f) => f.query === el.query) === el);
					sug = data as DeepRequired<FileFileSearchAutocomplete>;
				})
				.finally(() => (awaitingSuggestions = false));
			resetSearch();
		}
	}
	let lastSuggestionIndexFocused = 0;
	$: {
		if (
			searchFocused &&
			suggestionListElements.length &&
			suggestionListElements[selectedSuggestionIndex] &&
			lastSuggestionIndexFocused != selectedSuggestionIndex
		) {
			let el = suggestionListElements[selectedSuggestionIndex];
			let parent = el.parentElement!;
			if (el.offsetTop + el.clientHeight > parent.scrollTop + parent.clientHeight) {
				parent.scrollTo({ top: el.offsetTop + el.clientHeight - parent.clientHeight });
			} else if (el.offsetTop < parent.scrollTop) {
				parent.scrollTo({ top: el.offsetTop });
			}
			lastSuggestionIndexFocused = selectedSuggestionIndex;
		}
	}
	let exportDropdownOpen = false;
	let exportLastValueEl: HTMLButtonElement;
	let exportLastValue = "";
	let downloadDropdownOpen = false;
	let checkAll = false;
	function onCheckAll(e: Event) {
		let checked = (e.target as HTMLInputElement).checked;
		items = items.map((i) => ({ ...i, checked }));
	}
	function onCheck(e: Event) {
		let checked = (e.target as HTMLInputElement).checked;
		checkAll = checkAll && checked;
	}
	let items = [] as (DeepNullish<PageItem> & { checked: boolean })[];
	$: {
		if (pages) {
			setItems();
		}
	}
	function setItems() {
		items = (pages?.items as DeepNullish<PageItem>[]).map((el) => ({ ...el, checked: false }));
	}
	// $: console.log({pages, items, awaitingSearchResults});
	let iframeSrc = "";
	let iframeTitle = "";
	let mainScrollable: HTMLDivElement;
	let tableScrollable: HTMLDivElement;
	// function transferScrollFocus(parentElement: HTMLElement, childElement: HTMLElement) {
	// 	// Store the current scroll position of the parent
	// 	const parentScrollTop = parentElement.scrollTop;
	// 	const parentScrollHeight = parentElement.scrollHeight;
	// 	const parentClientHeight = parentElement.clientHeight;

	// 	// Check if we've reached the bottom of the parent scrollable area
	// 	if (Math.abs(parentScrollTop + parentClientHeight - parentScrollHeight) < 2) {
	// 		// We're at the bottom of the parent, transfer focus to child

	// 		// 1. Prevent scroll events from propagating to parent temporarily
	// 		const preventParentScroll = (e: Event) => {
	// 			e.stopPropagation();
	// 			// Once we've handled one scroll event, remove this handler
	// 			parentElement.removeEventListener('wheel', preventParentScroll, { capture: true });
	// 		};

	// 		// 2. Capture wheel events at the parent level before they bubble
	// 		parentElement.addEventListener('wheel', preventParentScroll, { capture: true });

	// 		// 3. Set focus to the child element to ensure it receives keyboard events
	// 		childElement.focus();

	// 		// 4. For touch devices, you might need similar handling for touch events
	// 		const preventParentTouch = (e: Event) => {
	// 			e.stopPropagation();
	// 			parentElement.removeEventListener('touchmove', preventParentTouch, { capture: true });
	// 		};
	// 		parentElement.addEventListener('touchmove', preventParentTouch, { capture: true });
	// 	}
	// }
	// let preventDefault = (e: Event) => e.preventDefault()
	function onScrollWheel(e: WheelEvent) {
		// console.log({e});
		// let { shiftKey, deltaX, deltaY, isTrusted } = e;
		// transferScrollFocus(mainScrollable, tableScrollable);
		// if (isTrusted) {
		// e.preventDefault();
		// // if (!shiftKey) {
		// // }
		// const wheelEvt = document.createEvent('MouseEvents');
		// wheelEvt.initEvent('wheel', true, true);
		// // Set deltaY depending on wheel up or wheel down
		// wheelEvt.deltaY = +120;
		// // wheelEvt.deltaY = -120;
		// // Pass event to element
		// tableScrollable.dispatchEvent(wheelEvt);
		// console.log({sh: mainScrollable.clientHeight, st: mainScrollable.scrollTop});
		// if (mainScrollable.scrollTop + mainScrollable.clientHeight >= mainScrollable.scrollHeight) {
		// 	console.log("doing it!")
		// 	// mainScrollable.();
		// 	// tableScrollable.click();
		// 	mainScrollable.addEventListener("scroll", preventDefault, { capture: true });
		// 	// mainScrollable.classList.add("overflow-y-hidden");
		// }
		// }
		// if (shiftKey) {
		// 	// tableScrollable.dispatchEvent(
		// 	// 	new WheelEvent("wheel", {
		// 	// 		...e,
		// 	// 		shiftKey: true,
		// 	// 	}
		// 	// ));
		// 	tableScrollable.scrollBy({left: deltaY, behavior: "auto"});
		// } else {
		// 	// debugger;
		// 	if (deltaY) {
		// 		if (isTrusted) {
		// 			e.preventDefault();
		// 			if (deltaY > 0) {
		// 				let difference = mainScrollable.scrollHeight - mainScrollable.scrollTop
		// 				if (difference > 0) {
		// 					// setTimeout(() => mainScrollable.dispatchEvent(e))
		// 					if (difference < deltaY) {
		// 					}
		// 				}
		// 				else {
		// 					// setTimeout(() => tableScrollable.dispatchEvent(e));
		// 				}
		// 			} else {
		// 			}
		// 		}
		// 	}
		// }
	}
	function onScrollTouch(e: TouchEvent) {
		// if (e.deltaX) {
		// }
	}

	$: res, suggestion, inputPlaceholder, search, searchFocused, contentChanged();
	let debounced = () => {};
	onMount(() => {
		debounced = debounce(submit, 1000);
		// @ts-ignore
		// function addEventListenerAll(target, listener, ...otherArguments) {
		// 	// install listeners for all natively triggered events
		// 	for (const key in target) {
		// 		if (/^on/.test(key)) {
		// 			const eventType = key.substr(2);
		// 			target.addEventListener(eventType, listener, ...otherArguments);
		// 		}
		// 	}
		// 	// dynamically install listeners for all manually triggered events, just-in-time before they're dispatched ;D
		// 	const dispatchEvent_original = EventTarget.prototype.dispatchEvent;
		// 	function dispatchEvent(event: Event) {
		// 		target.addEventListener(event.type, listener, ...otherArguments);  // multiple identical listeners are automatically discarded
		// 		// @ts-ignore
		// 		dispatchEvent_original.apply(this, arguments);
		// 	}
		// 	// @ts-ignore
		// 	EventTarget.prototype.dispatchEvent = dispatchEvent;
		// 	if (EventTarget.prototype.dispatchEvent !== dispatchEvent) throw new Error(`Browser is smarter than you think!`);

		// }

		// // usage example
		// addEventListenerAll(window, (evt: Event) => {
		// 	console.log(evt.type);
		// });
	});
	$: perPage, page, debounced();
	$: currentSearch, submit();
</script>

{#if advanced}
	{@html `<${""}style>${styleString}</${""}style>`}
{/if}
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	id="advanced_search"
	class:advanced
	bind:this={mainScrollable}
	class="fixed bg-advanced-search-surface top-0 w-full h-0 invisible [&.advanced]:visible [&.advanced]:h-[100vh] z-[40] flex flex-col items-stretch gap-2 {iframeSrc
		? 'overflow-y-hidden'
		: 'overflow-y-auto'} no-scroll-style"
	on:wheel|nonpassive={onScrollWheel}
	on:touchmove|nonpassive={onScrollTouch}
>
	<div
		class="iframe fixed top-0 left-0 min-h-[100vh] w-full z-10 overflow-x-clip {iframeSrc
			? 'overflow-y-auto'
			: 'overflow-y-clip pointer-events-none'} flex items-stretch"
	>
		<button
			on:click={() => (iframeSrc = "")}
			class:visible={!!iframeSrc}
			class="split grow transition-[backdrop-filter] [backdrop-filter:blur(0px)] [&.visible]:[backdrop-filter:blur(18px)]"
		></button>
		<div
			class:visible={!!!!iframeSrc}
			class="h-full absolute right-0 w-[calc(100%-200px)] bg-advanced-search-surface flex flex-col transition-transform translate-x-full [&.visible]:translate-x-0"
		>
			<div>
				<Button
					class="p-5 text-primary-text border-none leading-[25px] text-sm [&_.content]:gap-1"
					theme="none"
					icon="close"
					on:click={() => (iframeSrc = "")}
					iconClass="text-primary-icn size-[21px]">Close</Button
				>
			</div>
			<div class="grow relative">
				<div class="size-full flex flex-col justify-center items-center">
					<Icon name="loading" class="size-20 animate-spin origin-center text-primary-icn"></Icon>
				</div>
				{#if iframeSrc}
					<iframe
						class="absolute top-0 left-0 size-full"
						src={iframeSrc}
						frameborder="0"
						title={iframeTitle}
					></iframe>
				{/if}
			</div>
		</div>
	</div>
	<nav class="flex flex-col items-center py-4">
		<div class="container">
			<Button
				class="text-primary-text border-none leading-[25px] text-sm [&_.content]:gap-1"
				theme="none"
				icon="close"
				on:click={() => (advanced = false)}
				iconClass="text-primary-icn size-[21px]">Close</Button
			>
		</div>
	</nav>
	<div class="description flex flex-col items-center gap-1">
		<Icon name="string-search-color" class="text-brand-text size-[60px]"></Icon>
		<div class="flex flex-col items-center gap-2">
			<h1 class="text-primary-text text-[23px] leading-[33px] font-semibold">Advanced Search</h1>
			<h3 class="text-center text-sm leading-5 text-secondary-text max-w-3xl">
				Search a database containing millions of malware and goodware files. Goodware search
				presents you with a customized search results that allows you to trace the origin of the
				files.
			</h3>
		</div>
	</div>
	<div class="jist flex flex-col items-stretch">
		<TabsImproved
			tabs={["Search all", "Goodware"]}
			bind:value={currentTab}
			tabsClass="justify-center"
			contentClass=""
			tabClass="text-[15px] leading-[23px] p-2.5 px-5"
		>
			<div class="wrapper relative max-h-[100vh]">
				<div class="*:px-5">
					{#if currentTab === "Search all"}
						<div
							class="input pt-5"
							on:focusin={() => {
								// console.log("before focusin");
								clearTimeout(focusoutTimeout);
								focusoutTimeout = -1;
								focusinTimeout = window.setTimeout(() => {
									// console.log("focusin");
									searchFocused = true;
								});
							}}
							on:focusout={() => {
								// console.log("before focusout");
								clearTimeout(focusinTimeout);
								focusinTimeout = -1;
								focusoutTimeout = window.setTimeout(() => {
									// console.log("focusout");
									searchFocused = false;
								});
							}}
						>
							<div class="relative">
								<Input
									multiline
									rows="1"
									bind:This={sugEl}
									tabindex="-1"
									value={awaitingSuggestions && search === "" ? "" : suggestion}
									icon={awaitingSuggestions ? "loading" : "search"}
									iconClass="{awaitingSuggestions
										? 'animate-spin origin-center'
										: ''} text-gray-500"
									parentClass="absolute top-0 left-0"
									class="[font-variant-ligatures:none] overflow-hidden resize-none min-h-[1lh] text-searchbar-text border-primary-border active:border-primary-border focus:border-primary-border"
								></Input>
								<Input
									multiline
									rows="1"
									bind:This={inputEl}
									on:keydown={keydown}
									bind:value={search}
									placeholder={inputPlaceholder}
									icon={awaitingSuggestions ? "loading" : "search"}
									iconClass="{awaitingSuggestions
										? 'animate-spin origin-center'
										: ''} text-gray-500"
									class="[font-variant-ligatures:none] overflow-hidden resize-none min-h-[1lh] placeholder:text-searchbar-text border-primary-border active:border-primary-border focus:border-primary-border"
								></Input>
							</div>
							{#if suggestionList.length}
								<div class="relative rounded z-[20]">
									<div class="parent absolute w-full">
										<div class="overflow-clip rounded relative top-0 left-0 w-full">
											<ul
												class="relative max-h-[calc(72px*5+0px)] overflow-y-auto flex-col items-stretch bg-quaternary-surface border border-secondary-border rounded mt-2 overflow-clip [&.focused]:flex hidden"
												class:focused={showSuggestions}
											>
												{#each suggestionList as s, index}
													<button
														bind:this={suggestionListElements[index]}
														class:selected={index === selectedSuggestionIndex}
														class="
															flex flex-col items-start gap-1
															w-full p-[15px]
															hover:bg-quaternary-hov-surface
															focus:bg-quaternary-hov-surface
															focus-within:bg-quaternary-hov-surface
															[&.selected]:bg-quaternary-hov-surface
															"
														on:click={() => {
															setSearch(s.value);
															inputEl.focus();
														}}
													>
														<p
															class="text-xs font-medium leading-[18px] text-start overflow-ellipsis whitespace-nowrap overflow-hidden min-w-0 max-w-full"
															title={s.displayValue || s.value}
														>
															{s.displayValue || s.value}
														</p>
														<p class="text-xs font-medium leading-[18px] text-secondary-text">
															{s.description}
														</p>
													</button>
												{/each}
											</ul>
										</div>
									</div>
								</div>
							{/if}
						</div>
						<div class="[&.results.results.results]:px-0 results flex flex-col gap-1">
							{#if pages}
								{#if items.length && (!awaitingSearchResults || currentSearch === lastSearch)}
									<div class="max-w-full pt-5 flex flex-col items-stretch gap-5">
										<div class="flex px-5 gap-2">
											<PopUnder
												class="w-min"
												popupPosition="left"
												bind:popUnderOpen={exportDropdownOpen}
												popupClass="m-0 w-auto items-start z-[8]"
												animate={false}
											>
												<button
													slot="clickable"
													class="border border-primary-border text-primary-text px-3 py-2 rounded-sm"
												>
													<div class="flex items-center gap-2">
														<span class="font-medium">Export</span>
														<Icon name="arrow-down" class="size-[9px]"></Icon>
													</div>
												</button>
												<ul
													class="bg-quaternary-surface py-2 border border-primary-border rounded-base shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.25)]"
													slot="dropdown"
												>
													{#each [["selected", "selected"], ["10", "top 10"], ["100", "top 100"], ["all", "all files"]] as [value, text]}
														<li class="">
															<button
																class="w-full justify-start capitalize pl-4 pr-8 py-2 font-medium hover:bg-quaternary-hov2-surface text-start"
																on:click={() => {
																	exportDropdownOpen = false;
																	exportLastValue = text;
																	exportLastValueEl.click();
																	let f = {
																		selected: () =>
																			items
																				.filter((i) => i.checked)
																				.map((i) => i.id)
																				.join("\n") + "\n",
																		"10": () =>
																			items
																				.filter((_, i) => i < 10)
																				.map((i) => i.id)
																				.join("\n") + "\n",
																		"100": () =>
																			items
																				.filter((_, i) => i < 100)
																				.map((i) => i.id)
																				.join("\n") + "\n",
																		all: () => items.map((i) => i.id).join("\n") + "\n"
																	}[value];
																	window.navigator.clipboard.writeText((f || (() => ""))());
																}}>{text}</button
															>
														</li>
													{/each}
												</ul>
											</PopUnder>
											<PopUnder
												class="w-min"
												popupPosition="left"
												bind:popUnderOpen={downloadDropdownOpen}
												popupClass="m-0 w-auto items-start z-[8]"
												animate={false}
											>
												<button
													slot="clickable"
													class="border border-primary-border text-primary-text px-3 py-2 rounded-sm"
												>
													<div class="flex items-center gap-2">
														<span class="font-medium">Download</span>
														<Icon name="arrow-down" class="size-[9px]"></Icon>
													</div>
												</button>
												<ul
													class="bg-quaternary-surface py-2 border border-primary-border rounded-base shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.25)]"
													slot="dropdown"
												>
													{#each [["selected", "selected"], ["10", "top 10"], ["100", "top 100"], ["all", "all files"]] as [value, text]}
														<li class="">
															<button
																class="w-full justify-start capitalize pl-4 pr-8 py-2 font-medium hover:bg-quaternary-hov2-surface text-start"
																on:click={() => {
																	downloadDropdownOpen = false;
																}}
															>
																{text}
															</button>
														</li>
													{/each}
												</ul>
											</PopUnder>
											<PopUnder
												timeout={1500}
												animate={true}
												parentClass="h-0 *:shrink *:min-h-0 *:h-0"
												popupClass="top-0"
											>
												<button bind:this={exportLastValueEl} slot="clickable" class="h-0"></button>
												<div
													slot="dropdown"
													class="flex value-copied select-none bg-[#56AC30] text-white min-w-0 items-center rounded-[6px] gap-1 p-[8px] whitespace-nowrap text-nowrap"
												>
													<Icon name="check-circle" class="size-[18px]"></Icon>
													Exported {exportLastValue}&nbsp!
												</div>
											</PopUnder>
										</div>
										<div
											bind:this={tableScrollable}
											class="overflow-x-auto max-h-[100vh] overflow-y-auto --no-scroll-style max-w-full relative"
										>
											<table class="min-w-max w-full border-collapse">
												<thead
													class="
													[&_th]:py-3 [&_th]:px-1 [&_th:first-child]:pl-5 [&_th:last-child]:pr-5 --[&_th_*]:min-h-[44px]
													[&_th]:sticky [&_th]:top-0 [&_th]:bg-tbl-advanced-search-surface
												"
												>
													<tr>
														<th class="w-[20px] left-0 z-[5]">
															<div class="flex flex-col">
																<CheckBox on:change={onCheckAll} bind:checked={checkAll}></CheckBox>
															</div>
														</th>
														{#each ["sha256", "classification", "multiav", "first seen", "last scanned", "size", "type"] as thText}
															<th
																class="z-[2] uppercase text-tertiary-text font-semibold text-xs"
																align="left">{thText}</th
															>
														{/each}
													</tr>
												</thead>
												<tbody>
													{#if awaitingSearchResults}
														<tr
															class="[&_td]:align-top
															[&_td]:pb-9 [&_td]:pt-5 [&_td]:px-2
															[&_td:first-child]:pl-5 [&_td:last-child]:pr-5
															[&_td]:bg-advanced-search-surface"
														>
															<td colspan="8" class="sticky top-[50%] left-0">
																<div class="h-0 flex flex-col items-center justify-center">
																	<div
																		class="flex gap-1 items-center justify-center font-bold text-md text-tertiary-text"
																	>
																		<Icon
																			name="loading"
																			class="size-5 animate-spin origin-center text-primary-icn"
																		></Icon>
																		LOADING
																	</div>
																</div>
															</td>
														</tr>
													{/if}

													{#each items as el}
														<!-- <div>{JSON.stringify(el)}</div> -->
														<tr
															class="border-y first:border-t-0 last:border-b-0
															[&_td]:align-top
															[&_td]:pb-9 [&_td]:pt-5 [&_td]:px-2
															[&_td:first-child]:pl-5 [&_td:last-child]:pr-5
															[&_td]:bg-advanced-search-surface
															[&:hover_td]:bg-quaternary-hov2-surface
															[&:hover_.control]:visible
															{awaitingSearchResults ? '[&_td]:invisible border-transparent' : 'border-line-surface'}
															"
														>
															<td class="w-[20px] sticky left-0 z-[4]">
																<div class="flex flex-col">
																	<CheckBox on:change={onCheck} bind:checked={el.checked}
																	></CheckBox>
																</div>
															</td>
															<td>
																<div class="flex flex-col gap-2">
																	<div class="flex gap-2">
																		<a
																			href="/files/{el.id}/summary?behavior_id="
																			class="max-w-[max(40vw,300px)] text-ellipsis overflow-hidden break-keep font-semibold"
																			on:click={(e) => {
																				e.preventDefault();
																				iframeSrc = new URL(
																					`/files/${el.id}/summary?behavior_id=&strip`,
																					location.href
																				).href;
																			}}
																		>
																			{el.id}
																		</a>
																		<div class="flex gap-1">
																			<PopUnder popupPosition="left" timeout={1000} class="">
																				<button
																					on:click={() =>
																						window.navigator.clipboard.writeText(el.id ?? "")}
																					slot="clickable"
																					class="control invisible text-brand-text border-none size-5 flex justify-center items-center"
																				>
																					<Icon class="size-[18px]" name="content-copy"></Icon>
																				</button>
																				<div
																					slot="dropdown"
																					class="flex value-copied select-none bg-[#56AC30] text-white min-w-0 items-center rounded-[6px] gap-1 p-[10px] whitespace-nowrap text-nowrap"
																				>
																					<Icon name="check-circle"></Icon>
																					Hash copied&nbsp!
																				</div>
																			</PopUnder>
																			<a
																				href="/api/files/{el.id}/download/"
																				class="control invisible text-brand-text border-none p-0.5"
																			>
																				<!-- on:click={(e) => {
																				// e.preventDefault();
																				// window.fetch(`${env.PUBLIC_API_URL}files/${el.id}/download/`, {
																				// 	headers: {
																				// 		"Authorization": `Bearer ${session.token}`,
																				// 		"Content-Type": "application/json"
																				// 	}
																				// }).then(res => {
																				// 	if (res.status === 401) {
																				// 		return;
																				// 	}
																				// 	return res.blob()
																				// }).then(blob => {
																				// 	if (!blob) return;
																				// 	let file = URL.createObjectURL(blob);
																				// 	location.assign(file);
																				// });
																			}} -->
																				<Icon class="size-4" name="download-2"></Icon>
																			</a>
																		</div>
																	</div>
																	<div
																		class="flex pb-0.5 gap-1 {el.id === el.name
																			? 'text-secondary-text'
																			: ''}"
																	>
																		<Icon name="file" class="size-[17px]"></Icon>
																		{el.id === el.name ? "Not relevant" : el.name}
																	</div>
																	<div class="flex gap-1">
																		{#each parseTags(el.tags) as { category, name }}
																			<li class="flex">
																				<a
																					class="rounded-sm px-2 py-1.5 tags__tag tags__tag--{category}"
																					href="/tags/{category}/{name}">{name}</a
																				>
																			</li>
																		{/each}
																	</div>
																</div>
															</td>
															<td class="">
																<div
																	class="uppercase font-medium {el.class
																		? {
																				malicious: 'text-alert-red',
																				unknown: 'text-alert-orange',
																				suspicious: 'text-alert-orange',
																				benign: 'text-alert-green'
																			}[el.class]
																		: 'text-alert-orange'} flex gap-1.5 items-center"
																>
																	<Icon
																		name={el.class === "benign" ? "safe" : "unsafe"}
																		size="size-[14px]"
																	></Icon>
																	{el.class ?? "Unknown"}
																</div>
															</td>
															<td>{dflt(el.multiav?.hits, "?")}/{dflt(el.multiav?.total, "?")}</td>
															{#if true}
																{@const tm =
																	// @ts-ignore
																	(s) => (s ? timestampToFormattedDate(s).split(" ") : ["?", ""])}
																{@const fs = tm(el.first_seen)}
																{@const ls = tm(el.last_scanned)}
																<td>{fs[0]}<br />{fs[1]}</td>
																<td>{ls[0]}<br />{ls[1]}</td>
																<td>{typeof el.size === "number" ? convertBytes(el.size) : "?B"}</td
																>
																<td class="uppercase"
																	>{el.file_format ?? "?"}/{el.file_extension ?? "?"}</td
																>
															{/if}
														</tr>
													{/each}
													<!-- {/if} -->
												</tbody>
											</table>
											<div
												class="sticky z-[8] bottom-[-1px] left-0 w-full flex justify-between p-5 bg-advanced-search-surface border-t border-t-line-surface"
											>
												<PaginationPerPageSelect
													bind:current={perPage}
													max={Math.min(pages.total_count || 100, 100)}
												></PaginationPerPageSelect>
												<PaginationButtons
													bind:currentPage={page}
													totalPages={pages.page_count || 1}
												></PaginationButtons>
											</div>
										</div>
									</div>
								{:else if currentSearch !== lastSearch}
									<div class="py-8 text-center text-secondary-text">Searching...</div>
								{:else}
									<div class="py-8 text-center text-secondary-text">No results found.</div>
								{/if}
							{:else if awaitingSearchResults}
								<div class="py-8 text-center text-secondary-text">Searching...</div>
							{:else if pagesError}
								<div class="py-8 text-center text-alert-red">Error: {pagesError}</div>
							{/if}
						</div>
					{:else}
						<center class="py-8 text-secondary-text">Under construction...</center>
					{/if}
				</div>
			</div>
		</TabsImproved>
	</div>
</div>

<style>
</style>
