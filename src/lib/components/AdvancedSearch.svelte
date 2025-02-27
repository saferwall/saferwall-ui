<script lang="ts">
	import { onMount } from "svelte";
	import TabsImproved from "./cards/TabsImproved.svelte";
	import Button from "./form/Button.svelte";
	import Input from "./form/Input.svelte";
	import Icon from "./Icon.svelte";
	import { Configuration, FileApi, type FileFileSearchAutocomplete, type PaginationPages } from "$lib/api";
	import { autoCompleteData, parseSearch, type ConsumerThrow, type ParsingResult } from "$lib/utils/parseAdvancedSearch";
	import type { Saferwall } from "$lib/types";
	import CheckBox from "./form/CheckBox.v2.svelte";
	import { convertBytes, parseTags, timestampToFormattedDate } from "$lib/utils";
	import type { AxiosError } from "axios";

	export let advanced: boolean;
	export let session: Saferwall.Session;

	const api = new FileApi(new Configuration({accessToken: session.token}));

	let search = "";
	let searchEditHistory = [search];
	let searchEditHistoryIndex = 0;
	function searchEditHistoryPush(...newValues: string[]) {
		let spliced = searchEditHistory.toSpliced(searchEditHistoryIndex + 1);
		newValues = newValues.filter((nv, index) => newValues.indexOf(nv) === index).filter((nv, index, arr) => {
			let idx = -1 - index;
			return spliced.at(idx) !== nv
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
	$: items = (pages ? pages.items as {class: string | null, file_extension: string, file_format: string, first_seen?: number, id: string, last_scanned?: number, multiav: {hits: number, total: number}, name: string, size: number, tags?: Saferwall.Tags}[] : [])
		.map(el => ({...el}));
	function submit() {
		console.log("submitted");
		console.log({search});
		inputEl.blur();
		inputEl.disabled = true;
		awaitingSearchResults = true;
		api.filesSearchPost(perPage, page, {
			data: { query: search }
		})
		.finally(() => {
			inputEl.disabled = false;
			awaitingSearchResults = false;
		})
		.then((res) => {
			console.log(res.data);
			pages = res.data;
			// console.log(JSON.stringify(res.data));
		}).catch((err: AxiosError) => {
			console.log(err);
			pages = undefined;
			pagesError = (err.response?.data as any)?.message ?? ""
		})
	}
	function keydown(e: KeyboardEvent) {
		// console.log(`key: ${e.key}`);
		if (e.key.toLowerCase() === "z" && e.ctrlKey) {
			if (!e.shiftKey) { // undo
				e.preventDefault();
				// debugger;
				if (search !== searchEditHistory[searchEditHistoryIndex]) {
					searchEditHistoryPush(search);
				}
				searchEditHistoryIndex = Math.max(searchEditHistoryIndex - 1, 0);
				setSearch(searchEditHistory[searchEditHistoryIndex] || "", false);
			} else { // redo
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
			submit();
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
	let parsingData: { parseRes: ParsingResult, failedRe: ConsumerThrow, restIsSpacesOrEmpty: boolean};
	$: suggestionList, (selectedSuggestionIndex = 0);
	$: res, suggestion, search, contentChanged();
	$: search, (showSuggestions = searchFocused && !!suggestionList.length && !awaitingSuggestions);
	$: {
		if (search.trim()) {
			let [parseRes, failedRe] = parseSearch(search)
			// console.log("parseRes", parseRes)
			// console.log("failedRe", failedRe)
			if (!failedRe) {
				failedRe = [search.length, ["logicalOperator"], [""]];
			}
			let [ endIndex, tokenNames,  ] = failedRe;
			suggestionList = []
			let space = search.trimEnd() === search ? " " : "";
			let keyOrGroupSpace = space.repeat(+(parseRes.length && parseRes.at(-1)!.type === "logicalOperator"));
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
				suffix = "",
			}: {
				sourceList: Array<{ value: string; displayValue?: string, description: string }>;
				search: string;
				valueStartsWith?: string;
				prefix?: string;
				suffix?: string;
			}): void {
				if (valueStartsWith) {
					suggestionList.push(...sourceList
						.filter(sug => sug.value.startsWith(valueStartsWith) && sug.value.length !== valueStartsWith.length)
						.map(sug => ({
							...sug,
							displayValue: sug.displayValue || sug.value,
							value: search + "\u200B" + prefix + sug.value.substring(valueStartsWith.length) + suffix,
						}))
					);
				} else {
					suggestionList.push(...sourceList.map(sug => ({
						...sug,
						displayValue: sug.displayValue || sug.value,
						value: search + "\u200B" + prefix + sug.value + suffix,
					})));
				}
			}
			tokenNames.forEach(token => {
				switch (token) {
					case "key": {
						if (restIsSpacesOrEmpty) {
							addSuggestions({
								sourceList: autoCompleteData.keys,
								search,
								prefix: keyOrGroupSpace,
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
									search,
								});
							} else {
								// error, can't autocomplete
							}
							addSuggestions({
								sourceList: autoCompleteData.comparisonOperators,
								search,
							});
						} else if (!endsWithSpaces) {
							addSuggestions({
								sourceList: autoCompleteData.comparisonOperators,
								valueStartsWith: searchRest.trimStart(),
								search,
							});
						}
						break;
					}
					case "value": {
						if (!endsWithSpaces) {
							addSuggestions({
								sourceList: autoCompleteData.comparisonOperators,
								valueStartsWith: parseRes.at(-1)!.value,
								search,
							});
						}
						suggestion = search + "\u200B" +"<value>";
						break;
					}
					case "closingGroupingOperator": {
						if (restIsSpacesOrEmpty) {
							addSuggestions({
								sourceList: [autoCompleteData.groupingOperators[1]],
								search,
								prefix: keyOrGroupSpace,
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
								prefix: keyOrGroupSpace,
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
	};
	$: {
		if (searchFocused && suggestionList[selectedSuggestionIndex]) {
			suggestion = suggestionList[selectedSuggestionIndex].value;
		} else if (!searchFocused || (searchFocused && !(parsingData && parsingData.failedRe[1].includes("value") && parsingData.restIsSpacesOrEmpty))) {
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
	}
	let awaitingSuggestions = false;
	let awaitingSearchResults = false;
	$: {
		if (advanced && mounted) {
			awaitingSuggestions = true;
			api.filesSearchAutocompleteGet().then((res) => {
				let { data } = res;
				data.examples = [...(data.examples ?? []).map((e) => ({ query: "", comment: "", ...e }))];
				data.search_modifiers = [
					...(data.search_modifiers ?? []).map((s) => ({ query: "", comment: "", ...s }))
				]
				// temporary fix for duped queries from backend
				.filter((el, index, arr) => arr.find(f => f.query === el.query) === el);
				sug = data as DeepRequired<FileFileSearchAutocomplete>;
			}).finally(() => awaitingSuggestions = false);
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
				parent.scrollTo({top: el.offsetTop + el.clientHeight - parent.clientHeight});
			} else if (el.offsetTop < parent.scrollTop) {
				parent.scrollTo({top: el.offsetTop});
			}
			lastSuggestionIndexFocused = selectedSuggestionIndex;
		}
	}
</script>

{#if advanced}
	{@html `<${""}style>${styleString}</${""}style>`}
{/if}
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	id="advanced_search"
	class:advanced
	class="sticky bg-advanced-search-surface bottom-0 w-full h-0 invisible [&.advanced]:visible [&.advanced]:h-[100vh] z-[40] flex flex-col items-stretch gap-2 overflow-y-auto"
>
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
			tabClass="text-[15px] leading-[23px] p-2.5 px-5"
		>
			<div class="wrapper p-4">
				<div>
					{#if currentTab === "Search all"}
						<div
							class="relative"
							on:focusin={() => {
								clearTimeout(focusoutTimeout);
								focusoutTimeout = -1;
								focusinTimeout = window.setTimeout(() => {
									searchFocused = true;
								})
							}}
							on:focusout={() => {
								clearTimeout(focusinTimeout);
								focusinTimeout = -1;
								focusoutTimeout = window.setTimeout(() => {
									searchFocused = false;
								});
							}}
						>
							<Input
								multiline
								rows="1"
								bind:This={sugEl}
								tabindex="-1"
								value={awaitingSuggestions && search === "" ? "" : suggestion}
								icon={awaitingSuggestions ? "loading" : "search"}
								iconClass="{awaitingSuggestions ? "animate-spin origin-center" : ""} text-gray-500"
								parentClass="absolute top-0 left-0"
								class="[font-variant-ligatures:none] overflow-hidden resize-none min-h-[1lh] text-searchbar-text border-primary-border active:border-primary-border focus:border-primary-border"
							></Input>
							<Input
								multiline
								rows="1"
								bind:This={inputEl}
								on:keydown={keydown}
								bind:value={search}
								placeholder={suggestion
									? ""
									: (awaitingSuggestions ? "Loading..." : "Search filename, file path, hashes, application name, publisher name, certificates, and more ...")}
								icon={awaitingSuggestions ? "loading" : "search"}
								iconClass="{awaitingSuggestions ? "animate-spin origin-center" : ""} text-gray-500"
								class="[font-variant-ligatures:none] overflow-hidden resize-none min-h-[1lh] placeholder:text-searchbar-text border-primary-border active:border-primary-border focus:border-primary-border"
							></Input>
							{#if suggestionList.length}
								<div class="relative rounded z-[20]">
									<div class="parent absolute w-full">
										<div class="overflow-clip rounded relative top-0 left-0 w-full">
											<ul
												class="relative max-h-[calc(72px*5+0px)] overflow-y-auto flex-col items-stretch bg-quaternary-surface border border-secondary-border rounded mt-2 overflow-clip [&.focused]:flex hidden"
												class:focused={showSuggestions}
											>
												{#each suggestionList as s, index}
													<button bind:this={suggestionListElements[index]}
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
						<div class="results flex flex-col gap-1">
							{#if awaitingSearchResults}
								<div class="py-8 text-center text-secondary-text">Searching...</div>
							{:else}
								{#if pages}
									{#if items.length}
										<table>
											<thead class="[&_th]:p-2">
												<th class="w-fit">
													<div class="flex">
														<CheckBox></CheckBox>
													</div>
												</th>
												{#each ["sha256", "classification", "multiav", "first seen", "last scanned", "size", "type"] as thText}
													<th class="uppercase" align="left">{thText}</th>
												{/each}
											</thead>
											<tbody>
												{#each items as el}
													<!-- <div>{JSON.stringify(el)}</div> -->
													<tr class="[&_td]:p-2">
														<td class="w-fit">
															<div class="flex">
																<CheckBox></CheckBox>
															</div>
														</td>
														<td>
															<div class="flex flex-col gap-1">
																<div>
																	{el.id}
																</div>
																<div class="flex gap-1">
																	{#each parseTags(el.tags) as {category, name}}
																		<li class="flex">
																			<a class="rounded-sm px-2.5 py-1.5 tags__tag tags__tag--{category}" href="/tags/{category}-{name}">{name}</a>
																		</li>
																	{/each}
																</div>
															</div>
														</td>
														<td class="">
															<div class="capitalize {el.class ? {malicious: "text-alert-red", unknown: "text-alert-orange", benign: "text-alert-green"}[el.class] : "text-alert-orange"} flex gap-1.5 items-center">
																<Icon name={el.class === "benign" ? "safe" : "unsafe"} size="size-[14px]"></Icon>
																{el.class ?? "Unknown"}
															</div>
														</td>
														<td>{el.multiav.hits}/{el.multiav.total}</td>
														{#if true}
															{@const tm = 
																// @ts-ignore
																(s) => 
																s ? timestampToFormattedDate(s).split(" ") : ["Unknown", ""]}
															{@const fs = tm(el.first_seen)}
															{@const ls = tm(el.last_scanned)}
															<td>{fs[0]}<br>{fs[1]}</td>
															<td>{ls[0]}<br>{ls[1]}</td>
															<td>{convertBytes(el.size)}</td>
															<td class="uppercase">{el.file_format }/{el.file_extension}</td>
														{/if}
													</tr>
												{/each}
											</tbody>
										</table>
									{:else}
										<div class="py-8 text-center text-secondary-text">No results found.</div>
									{/if}
								{:else if pagesError}
									<div class="py-8 text-center text-alert-red">Error: {pagesError}</div>
								{/if}
							{/if}
						</div>
					{:else}
						<center class="text-secondary-text">Under construction...</center>
					{/if}
					<input type="submit" hidden />
				</div>
			</div>
		</TabsImproved>
	</div>
</div>

<style>
	td {
		vertical-align: top;
	}
</style>