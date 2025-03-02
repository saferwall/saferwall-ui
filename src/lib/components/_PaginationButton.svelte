<script lang="ts">
	import Button from "./form/Button.svelte";

	export let middle = false;
	export let currentPage: number;
	export let offset = 0;
	export let page = 1;
	export let awaiting = false;
	export let inputPressed = false;
	export let totalPages: number;
	export let This: HTMLElement;
</script>

<li>
	<Button
		class="{middle
			? 'text-white bg-brand-surface underline current_page_button'
			: `border border-secondary-border text-secondary-text
				hover:text-brand-text hover:bg-brand-CF-surface hover:border-transparent
				active:text-white active:bg-brand-surface`} rounded-sm h-full {middle ? "pl-[7px] pr-[4px]" : "px-[10px]"} py-[10px] min-w-[calc(1lh+22px)]"
		on:click={() => {
			if (offset) {
				currentPage += offset;
				if (currentPage < 1)
					currentPage = 1;
				else if (currentPage > totalPages)
					currentPage = totalPages;
			}
			else {
				currentPage = page;
			}
		}}
		loading={middle && awaiting}
	>
		<div
			class="
				outline-none
				{
					middle ?
					"cursor-text current_page" :
					""
				}"
			style="{middle && inputPressed ? `min-width: calc(${totalPages.toString().length}ch + 0px)` : ""}"
			role="textbox"
			on:blur={function (e) {
				// @ts-ignore
				e.target.innerText = currentPage.toString()
			}}
			tabindex={middle ? 0 : -1}
			contenteditable={middle ? "plaintext-only" : "false"}
			on:keypress={function (e) {
				if (e.key === "Enter") {
					e.preventDefault();
					try {
						// @ts-ignore
						currentPage = parseInt(this.innerText);
						if (currentPage < 1) {
							currentPage = 1;
						} else if (currentPage > totalPages) {
							currentPage = totalPages;
						}
					} catch {}
				}
			}}
			on:keydown={function (e) {
				if (["ArrowUp", "ArrowDown"].includes(e.key)) {
					e.preventDefault();
					try {
						// @ts-ignore
						// currentPage = parseInt(this.innerText) + (+(e.key === "ArrowUp") * 2 - 1) * (e.shiftKey ? 10 : 1)
						// if (currentPage < 1) {
						// 	currentPage = 1;
						// } else if (currentPage > totalPages) {
						// 	currentPage = totalPages;
						// }
						// // @ts-ignore
						// this.innerText = currentPage
						// // @ts-ignore
						currentPage += (+(e.key === "ArrowUp") * 2 - 1) * (e.shiftKey ? 10 : 1);
						setTimeout(() => {
							let target = This.querySelector(".current_page")
							if (target) {
								// @ts-ignore
								target.focus();
							}
						})
					} catch {}
				}
			}}
		>
			{middle ? currentPage : (offset ? ("+".repeat(+!(offset < 0)) + offset) : page)}
		</div>
		{#if middle}
			<div class="pl-[2px] flex flex-col justify-center">
				<button on:click={() => currentPage++} class="pb-0 bg-black p-0.5 opacity-25 hover:opacity-35">
					<div class="border-white border-b-4 border-x-[3px] border-x-transparent"></div>
				</button>
				<button on:click={() => currentPage--} class="pt-0 bg-black p-0.5 opacity-25 hover:opacity-35">
					<div class="border-white border-t-4 border-x-[3px] border-x-transparent"></div>
				</button>
			</div>
		{/if}
	</Button>
</li>