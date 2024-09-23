<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "../Icon.svelte";
	import { twMerge } from "tailwind-merge";

	let Class = "";
	export let value: string;
	export let copiedText = "Copied !";
	export let popupPosition: "right" | "left" | "center" = "center";
	export { Class as class };
	export let popupClass = "";

	function hideElement(el: HTMLElement) {
		el.classList.add("hidden");
		el.classList.remove("flex");
	}

	function showElement(el: HTMLElement) {
		el.classList.remove("hidden");
		el.classList.add("flex");
	}

	let popup: HTMLElement;
	let copied: HTMLElement;
	let copiedTimeout: number;

	onMount(() => {
		let listener = (event: MouseEvent) => {
			if (!popup.contains((event.target as HTMLElement))) {
				popupOpen = false;
				hideElement(popup);
			}
		};
		window.addEventListener("click", listener, {
			capture: true,
		});
		return () => {
			window.removeEventListener("click", listener);
		}
	})

	let popupOpen = false;
</script>

<button class={twMerge("text-ellipsis whitespace-nowrap overflow-hidden hover:text-brand-text", Class)} on:click={() => {
	popupOpen = true;
	hideElement(copied);
	showElement(popup);
}}>
	{value}
</button>
<div bind:this={popup} class={twMerge("absolute z-[1] right-0 top-[calc(100%+0.5rem)] hidden flex-col items-end gap-2 mx-auto w-fit", popupClass)}
	style:right={popupPosition !== "left" ? "0" : "unset"}
	style:left={popupPosition !== "right" ? "0" : "unset"}
>
	<div class="main flex gap-2 p-4 text-primary-text bg-hash-surface rounded-base border border-secondary-border shadow-[0px_2px_13px_0px_rgba(0,0,0,0.1)] w-full">
		<div class="break-words min-w-0">{value}</div>
		<button class="flex-shrink-0 p-1 flex h-fit border-none" on:click={() => {
			clearTimeout(copiedTimeout);
			showElement(copied);
			navigator.clipboard.writeText(value);
			copiedTimeout = window.setTimeout(() => hideElement(copied), 1000)
		}}>
			<svg name="content-copy" class="text-brand-text" width="20" height="20">
				<use href="/images/icons.svg#icon-content-copy" />
			</svg>
		</button>
	</div>
	<div bind:this={copied} class="value-copied absolute top-[calc(100%+0.5rem)] right-0 select-none bg-[#56AC30] text-white min-w-0 hidden items-center rounded-[6px] gap-1 p-[10px] whitespace-nowrap text-nowrap">
		<Icon name="check-circle"></Icon>
		{copiedText}
	</div>
</div>