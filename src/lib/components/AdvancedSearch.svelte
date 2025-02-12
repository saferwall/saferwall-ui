<script lang="ts">
	import { onMount } from "svelte";
	import TabsImproved from "./cards/TabsImproved.svelte";
	import Button from "./form/Button.svelte";
	import Input from "./form/Input.svelte";
	import Icon from "./Icon.svelte";
	import { Configuration, FileApi, type FileFileSearchAutocomplete } from "$lib/api";
	import { autoCompleteData, parseSearch, type ConsumerStrings } from "$lib/utils/parseAdvancedSearch";

	export let advanced: boolean;

	let search = "";
	function setSearch(nv: string) {
		search = nv;
	}
	let suggestion = "";
	let currentTab = "Goodware";
	function submit(e: SubmitEvent) {
		e.preventDefault();
		console.log("submitted");
	}
	function keydown(e: KeyboardEvent) {
		// console.log(`key: ${e.key}`);
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
		}
		if (e.key === "Tab") {
			e.preventDefault();
		}
		let limit = () => {
			e.preventDefault();
			selectedSuggestionIndex =
				(selectedSuggestionIndex + suggestionList.length) % suggestionList.length;
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
			showSuggestions = false;
		}
		if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.key === "Tab") {
			if (suggestionList[selectedSuggestionIndex]) {
				setSearch(suggestionList[selectedSuggestionIndex].value);
			} 
			// else if (search !== "") {
			// 	setSearch(suggestion.replace(/\u200B/g, ""));
			// }
		}
	}
	type DeepRequired<T> = T extends object
		? {
				[K in keyof T]-?: T[K] extends Array<infer U> ? Array<DeepRequired<U>> : DeepRequired<T[K]>;
			}
		: T;

	let sug: DeepRequired<FileFileSearchAutocomplete> = { examples: [], search_modifiers: [] };
	// {
	// 	examples: [
	// 		{
	// 			value: "engines:ransom AND p:5 AND fs:2d+",
	// 			description: "Latest ransomware"
	// 		},
	// 		{
	// 			value: "entity:url AND engines:phising AND p:3+ AND fs:2d+",
	// 			description: "Latest phising URLs"
	// 		},
	// 		{
	// 			value: "entity:domain ND p:3+AND detected_communicating_files_count:10+ AND (category:infection OR category:malware or category:bot) AND Im:2d+",
	// 			description: "Recent command-and control domains"
	// 		},
	// 		{
	// 			value: "tag:cve-* AND positives:5+ AND fs:2d_+",
	// 			description: "Latest vulnerability weaponization sightings"
	// 		},
	// 		{
	// 			value: "crowdsourced_yara_rule:*APT* AND p:3+ AND fs:2d+",
	// 			description: "Recent APT-related malware"
	// 		},
	// 	],
	// 	tokens: [
	// 		{
	// 			engines: [ "avira", "avast", "windefender", "kaspersky", "eset" ],
	// 			entity: [ "url", "domain", "something" ],
	// 			tag: [ "cve-critical", "cve-suspicious", "cve-8" ],
	// 		}
	// 	],
	// }

	// const autoCompleteData = {
	// 	logicalOperators: [
	// 		{
	// 			value: "AND",
	// 			comment: "AND logical operator"
	// 		},
	// 		{
	// 			value: "OR",
	// 			comment: "OR logical operator"
	// 		}
	// 	],
	// 	groupingOperators: [
	// 		{
	// 			value: "(",
	// 			comment: "Opening grouping operator"
	// 		},
	// 		{
	// 			value: ")",
	// 			comment: "Closing grouping operator"
	// 		}
	// 	],
	// 	comparisonOperators: [
	// 		{
	// 			value: "=",
	// 			comment: "Equality comparison operator"
	// 		},
	// 		{
	// 			value: "!=",
	// 			comment: "Innequality comparison operator"
	// 		},
	// 		{
	// 			value: ">",
	// 			comment: "Strictly greater than comparison operator"
	// 		},
	// 		{
	// 			value: "<",
	// 			comment: "Strictly lesser than comparison operator"
	// 		},
	// 		{
	// 			value: ">=",
	// 			comment: "Greater or equal to comparison operator"
	// 		},
	// 		{
	// 			value: "<=",
	// 			comment: "Lesser or equal to comparison operator"
	// 		}
	// 	],
	// 	keys: [] as { value: string; comment: string }[]
	// } satisfies Record<string, { value: string; comment: string }[]>;
	// $: autoCompleteData.keys = sug.search_modifiers.map((sm) => ({
	// 	value: sm.query,
	// 	comment: sm.comment
	// }));
	// const logicalOperators = autoCompleteData.logicalOperators.map((o) => o.value);
	// const groupingOperators = autoCompleteData.groupingOperators.map((o) => o.value);
	// const comparisonOperators = autoCompleteData.comparisonOperators.map((o) => o.value);
	// function toReLiteral(str: string) {
	// 	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	// }
	// function parseSearch(str: string) {
	// 	// str = str.trim();
	// 	// str += " ";
	// 	let i = 0;
	// 	function parse(depth = 0) {
	// 		let parsingResult = [] as { value: string, type: ConsumerStrings }[]
	// 		function consumerMain(re: RegExp | string, flags = "") {
	// 			re = new RegExp(re, "y" + flags);
	// 			re.lastIndex = i;
	// 			let res = re.exec(str);
	// 			if (res) {
	// 				i += res[0].length;
	// 			}
	// 			return [res, re];
	// 		}
	// 		class Consumers {
	// 			static whitespaces(optional: "*" | "+") {
	// 				return consumerMain("\\s" + optional);
	// 			}
	// 			static key() {
	// 				return consumerMain(
	// 					`[^\\s${toReLiteral(groupingOperators.join("") + comparisonOperators.join(""))}]+`
	// 				);
	// 			}
	// 			static comparisonOperator() {
	// 				return consumerMain(comparisonOperators.map((o) => toReLiteral(o)).join("|"));
	// 			}
	// 			static value() {
	// 				return consumerMain(`[^\\s${toReLiteral(groupingOperators[1])}]+`);
	// 			}
	// 			static logicalOperator() {
	// 				return consumerMain(logicalOperators.map((o) => toReLiteral(o)).join("|"), "i");
	// 			}
	// 			static openingGroupingOperator() {
	// 				return consumerMain(toReLiteral(groupingOperators[0]));
	// 			}
	// 			static closingGroupingOperator() {
	// 				return consumerMain(toReLiteral(groupingOperators[1]));
	// 			}
	// 			static endOfString() {
	// 				return consumerMain(/$/);
	// 			}
	// 		}
	// 		let fatal = () => i != str.length;
	// 		type ConsumerStrings = Exclude<keyof typeof Consumers, "prototype">;
	// 		type ConsumerThrow = [lastIndex: number, fatal: boolean, expected: string[], regexes: string[]]
	// 		function consume(consumers: {
	// 			[K in ConsumerStrings]?: Parameters<(typeof Consumers)[K]> | (typeof Consumers)[K];
	// 		}) {
	// 			let key: ConsumerStrings;
	// 			let regexes = [] as RegExp[];
	// 			for (key in consumers) {
	// 				let args = consumers[key] as any[];
	// 				if (typeof consumers[key] === "function") {
	// 					args = [];
	// 				}
	// 				let [res, re] = (Consumers[key] as (...args: any[]) => [RegExpExecArray | null, RegExp])(...args);
	// 				regexes.push(re);
	// 				if (res) {
	// 					parsingResult.push({ type: key, value: res[0] })
	// 					return res
	// 				};
	// 			}
	// 			throw [
	// 				i,
	// 				fatal(),
	// 				Object.keys(consumers).map((key) =>
	// 					key.replace(/[A-Z]/g, (letter: string) => ` ${letter.toLowerCase()}`).trim()
	// 				),
	// 				regexes.map(re => re.source),
	// 			] satisfies ConsumerThrow;
	// 		}
	// 		let {
	// 			key,
	// 			comparisonOperator,
	// 			value,
	// 			logicalOperator,
	// 			openingGroupingOperator,
	// 			closingGroupingOperator,
	// 			endOfString,
	// 		} = Consumers;
	// 		function parseKeyCmpValue() {
	// 			consume({ whitespaces: ["*"] });
	// 			let [res] = consume({ key, openingGroupingOperator });
	// 			if (res === groupingOperators[0]) {
	// 				parse(depth + 1);
	// 				return;
	// 			}
	// 			consume({ whitespaces: ["*"] });
	// 			consume({ comparisonOperator });
	// 			consume({ whitespaces: ["*"] });
	// 			consume({ value });
	// 		}
	// 		parseKeyCmpValue();
	// 		while (true) {
	// 			try {
	// 				consume({ whitespaces: ["+"] });
	// 				consume({ logicalOperator }); // and | or
	// 				consume({ whitespaces: ["+"] });
	// 			} catch {
	// 				consume({ ...(depth ? { closingGroupingOperator } : { endOfString }) })
	// 				consume({ whitespaces: ["*"] });
	// 			}
	// 			parseKeyCmpValue();
	// 		}
	// 	}
	// 	try {
	// 		parse();
	// 	} catch (e) {}
	// }
	$: autoCompleteData.keys = sug.search_modifiers.map((sm) => ({
		value: sm.query,
		description: sm.comment
	}));

	let suggestionList = [] as { value: string; displayValue?: string; description: string }[];
	let suggestionListElements = [] as HTMLElement[];
	let searchFocused = false;
	let res = [] as ResizeObserverEntry[];

	let focusoutTimeout = -1;
	let selectedSuggestionIndex = 0;
	// $: console.log({selectedSuggestionIndex})
	let inputEl: HTMLInputElement;
	let sugEl: HTMLInputElement;
	const styleString = `
		:not(#advanced_search, #advanced_search *, *:has( #advanced_search)) {
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
	$: {
		if (searchFocused) {
			if (suggestionList[selectedSuggestionIndex]) {
				suggestion = suggestionList[selectedSuggestionIndex].value;
			} else {
				suggestion = ""
			}
		}
		// else if (searchFocused && search !== "") suggestion = search + "\u200B:value";
		else if (!searchFocused) {
			suggestion = "";
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
	$: suggestionList, (selectedSuggestionIndex = 0);
	$: res, suggestion, search, contentChanged();
	$: search, (showSuggestions = searchFocused && !!suggestionList.length);
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
			let keyOrGroupSpace = space.repeat(+(parseRes.at(-1)!.type === "logicalOperator"));
			let endsWithSpaces = !space;
			// console.log({endsWithSpace})
			let searchRest = search.substring(endIndex);
			let restIsSpacesOrEmpty = !searchRest.trimEnd();
			tokenNames.forEach(token => {
				switch (token) {
					case "key": {
						if (restIsSpacesOrEmpty) {
							suggestionList.push(...(autoCompleteData.keys.map(sug => ({
								...sug,
								displayValue: sug.value,
								value: search + keyOrGroupSpace + sug.value,
							}))));
						} else {
							// error, expected key at endIndex
						}
						break;
					}
					case "comparisonOperator": {
						if (restIsSpacesOrEmpty) {
							if (!endsWithSpaces) {
								suggestionList.push(...(autoCompleteData.keys
									.filter(sug => sug.value.startsWith(parseRes.at(-1)!.value) && sug.value.length !== parseRes.at(-1)!.value.length)
									.map(sug => ({
										...sug,
										displayValue: sug.value,
										value: search + sug.value.substring(parseRes.at(-1)!.value.length),
									}))
								));
							} else {
								// error, can't autocomplete
							}
							suggestionList.push(...(autoCompleteData.comparisonOperators.map(sug => ({
								...sug,
								displayValue: sug.value,
								value: search + sug.value,
							}))));
						} else if (!endsWithSpaces) {
							suggestionList.push(...(autoCompleteData.comparisonOperators
								.filter(sug => sug.value.startsWith(searchRest.trimStart()) && sug.value.length !== searchRest.trimStart().length)
								.map(sug => ({
									...sug,
									displayValue: sug.value,
									value: search + sug.value.substring(searchRest.trimStart().length),
								}))
							));
						}
						break;
					}
					case "value": {
						if (!endsWithSpaces) {
							suggestionList.push(...(autoCompleteData.comparisonOperators
								.filter(sug => sug.value.startsWith(parseRes.at(-1)!.value) && sug.value.length !== parseRes.at(-1)!.value.length)
								.map(sug => ({
									...sug,
									displayValue: sug.value,
									value: search + sug.value.substring(parseRes.at(-1)!.value.length),
								}))
							));
						}
						break;
					}
					case "closingGroupingOperator": {
						if (restIsSpacesOrEmpty) {
							suggestionList.push(...([autoCompleteData.groupingOperators[1]].map(sug => ({
								...sug,
								displayValue: sug.value,
								value: search + keyOrGroupSpace + sug.value,
							}))));
						}
						break;
					}
					case "logicalOperator": {
						if (restIsSpacesOrEmpty) {
							suggestionList.push(...(autoCompleteData.logicalOperators.map(sug => ({
								...sug,
								displayValue: sug.value,
								value: search + space + sug.value,
							}))));
						} else if (!endsWithSpaces) {
							suggestionList.push(...(autoCompleteData.logicalOperators
								.filter(sug => sug.value.startsWith(searchRest.trimStart()) && sug.value.length !== searchRest.trimStart().length)
								.map(sug => ({
									...sug,
									displayValue: sug.value,
									value: search + sug.value.substring(searchRest.trimStart().length),
								}))
							));
						}
						break;
					}
					case "openingGroupingOperator": {
						if (restIsSpacesOrEmpty) {
							suggestionList.push(...([autoCompleteData.groupingOperators[0]].map(sug => ({
								...sug,
								displayValue: sug.value,
								value: search + keyOrGroupSpace + sug.value,
							}))));
						}
						break;
					}
					case "endOfString": {

						break;
					}
				}
			})
			suggestionList = [...suggestionList];
		}
	};
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
	const api = new FileApi(new Configuration());
	$: {
		if (advanced && mounted) {
			api.filesSearchAutocompleteGet().then((res) => {
				let { data } = res;
				data.examples = [...(data.examples ?? []).map((e) => ({ query: "", comment: "", ...e }))];
				data.search_modifiers = [
					...(data.search_modifiers ?? []).map((s) => ({ query: "", comment: "", ...s }))
				]
				// temporary fix for duped queries from backend
				.filter((el, index, arr) => arr.find(f => f.query === el.query) === el);
				sug = data as DeepRequired<FileFileSearchAutocomplete>;
			});
		}
	}
	$: {
		if (suggestionListElements.length && suggestionListElements[selectedSuggestionIndex]) {
			suggestionListElements[selectedSuggestionIndex].focus();
			inputEl.focus();
		}
	}
	$: console.log({sug});
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
			tabs={["Goodware", "Search all"]}
			bind:value={currentTab}
			tabsClass="justify-center"
			tabClass="text-[15px] leading-[23px] p-2.5 px-5"
		>
			<div class="wrapper pt-4 px-4">
				<form method="GET" on:submit={submit}>
					{#if currentTab === "Goodware"}
						<div
							class="relative"
							on:focusin={() => {
								clearTimeout(focusoutTimeout);
								focusoutTimeout = -1;
								searchFocused = true;
							}}
							on:focusout={() => {
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
								value={suggestion}
								icon="search"
								iconClass="text-gray-500"
								parentClass="absolute top-0 left-0"
								class="overflow-hidden resize-none min-h-[1lh] text-searchbar-text border-primary-border active:border-primary-border focus:border-primary-border"
							></Input>
							<Input
								multiline
								rows="1"
								bind:This={inputEl}
								on:keydown={keydown}
								bind:value={search}
								placeholder={suggestion
									? ""
									: "Search filename, file path, hashes, application name, publisher name, certificates, and more ..."}
								icon="search"
								iconClass="text-gray-500"
								class="overflow-hidden resize-none min-h-[1lh] placeholder:text-searchbar-text border-primary-border active:border-primary-border focus:border-primary-border"
							></Input>
							{#if suggestionList.length}
								<ul
									class="relative max-h-[calc(72px*5+3px)] overflow-y-auto flex flex-col items-stretch bg-quaternary-surface border border-secondary-border rounded mt-2 overflow-clip [&.focused]:visible invisible"
									class:focused={showSuggestions}
								>
									{#each suggestionList as s, index}
										<!-- <li class=""  tabindex="1"> -->
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
										<!-- </li> -->
									{/each}
								</ul>
							{/if}
							<!-- <div>{JSON.stringify({showSuggestions})}</div> -->
						</div>
					{:else}
						<div>search all</div>
					{/if}
					<input type="submit" hidden />
				</form>
			</div>
		</TabsImproved>
	</div>
</div>
