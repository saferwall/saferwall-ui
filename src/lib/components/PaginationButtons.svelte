<script lang="ts">
	import { onMount } from "svelte";
	import Button from "./form/Button.svelte";
	import InputRange from "./InputRange.svelte";

	export let currentPage: number;
	let _currentPage = currentPage;
	export let totalPages: number;
	export let awaiting = false;

	let This: HTMLElement;
	let inputPressed = false;

	$: {
		if (_currentPage < 1) {
			_currentPage = 1;
		} else if (_currentPage > totalPages) {
			_currentPage = totalPages;
		}
		currentPage = _currentPage;
	}
	function setThisText() {
		if (This) {
			This.innerText = _currentPage.toString();
		}
	}
	$: _currentPage, setThisText();
	
	onMount(() => {
		This.innerText = _currentPage.toString();
	})

</script>

<div class="flex flex-col gap-2">
	<ul class="flex gap-2 flex-shrink-0 min-w-max">
		<li>
			<Button
				class="border border-secondary-border text-secondary-text
				hover:text-brand-text hover:bg-brand-CF-surface hover:border-transparent
				active:text-white active:bg-brand-surface rounded-sm h-full px-[10px] py-[10px] min-w-[calc(1lh+22px)]"
				on:click={() => {
					_currentPage = 1;
				}}>{1}</Button
			>
		</li>
		<li>
			<Button
				class="border border-secondary-border text-secondary-text
				hover:text-brand-text hover:bg-brand-CF-surface hover:border-transparent
				active:text-white active:bg-brand-surface rounded-sm h-full px-[10px] py-[10px] min-w-[calc(1lh+22px)]"
				on:click={() => {
					_currentPage -= 100;
				}}>{-100}</Button
			>
		</li>
		<li>
			<Button
				class="border border-secondary-border text-secondary-text
				hover:text-brand-text hover:bg-brand-CF-surface hover:border-transparent
				active:text-white active:bg-brand-surface rounded-sm h-full px-[10px] py-[10px] min-w-[calc(1lh+22px)]"
				on:click={() => {
					_currentPage -= 10;
				}}>{-10}</Button
			>
		</li>
		<li>
			<Button
				class="text-white bg-brand-surface underline current_page_button rounded-sm h-full pl-[7px] pr-[4px] py-[10px] min-w-[calc(1lh+22px)]"
				loading={awaiting}
			>
				<div
					bind:this={This}
					class="outline-none cursor-text"
					style={inputPressed ? `min-width: calc(${totalPages.toString().length}ch + 0px)` : ""}
					role="textbox"
					on:blur={function (e) {
						console.log("here?")
						// @ts-ignore
						e.target.innerText = _currentPage.toString();
					}}
					tabindex="0"
					contenteditable="plaintext-only"
					on:keypress={function (e) {
						if (e.key === "Enter") {
							e.preventDefault();
							try {
								// @ts-ignore
								_currentPage = parseInt(this.innerText);
								if (_currentPage < 1) {
									_currentPage = 1;
								} else if (_currentPage > totalPages) {
									_currentPage = totalPages;
								}
							} catch {}
						}
					}}
					on:keydown={function (e) {
						if (["ArrowUp", "ArrowDown"].includes(e.key)) {
							e.preventDefault();
							try {
								_currentPage += (+(e.key === "ArrowUp") * 2 - 1) * (e.shiftKey ? 10 : 1);
							} catch {}
						}
					}}
				></div>
				<div class="pl-[2px] flex flex-col justify-center">
					<button
						on:click={() => _currentPage++}
						class="pb-0 bg-black p-0.5 opacity-25 hover:opacity-35"
					>
						<div class="border-white border-b-4 border-x-[3px] border-x-transparent"></div>
					</button>
					<button
						on:click={() => _currentPage--}
						class="pt-0 bg-black p-0.5 opacity-25 hover:opacity-35"
					>
						<div class="border-white border-t-4 border-x-[3px] border-x-transparent"></div>
					</button>
				</div>
			</Button>
		</li>
		<li>
			<Button
				class="border border-secondary-border text-secondary-text
				hover:text-brand-text hover:bg-brand-CF-surface hover:border-transparent
				active:text-white active:bg-brand-surface rounded-sm h-full px-[10px] py-[10px] min-w-[calc(1lh+22px)]"
				on:click={() => {
					_currentPage += 10;
				}}>+{10}</Button
			>
		</li>
		<li>
			<Button
				class="border border-secondary-border text-secondary-text
				hover:text-brand-text hover:bg-brand-CF-surface hover:border-transparent
				active:text-white active:bg-brand-surface rounded-sm h-full px-[10px] py-[10px] min-w-[calc(1lh+22px)]"
				on:click={() => {
					_currentPage += 100;
				}}>+{100}</Button
			>
		</li>
		<li>
			<Button
				class="border border-secondary-border text-secondary-text
				hover:text-brand-text hover:bg-brand-CF-surface hover:border-transparent
				active:text-white active:bg-brand-surface rounded-sm h-full px-[10px] py-[10px] min-w-[calc(1lh+22px)]"
				on:click={() => {
					_currentPage = totalPages;
				}}>{totalPages}</Button
			>
		</li>
	</ul>
	<InputRange
		trackColor={"var(--surface-brand)"}
		trackHeight={8}
		thumbSize={15}
		min={1}
		value={_currentPage}
		max={totalPages}
		on:input={function () {
			// @ts-ignore
			This.innerText = this.value;
		}}
		on:change={function () {
			// @ts-ignore
			_currentPage = parseInt(this.value);
		}}
		on:mousedown={() => (inputPressed = true)}
		on:mouseup={() => (inputPressed = false)}
	></InputRange>
</div>
