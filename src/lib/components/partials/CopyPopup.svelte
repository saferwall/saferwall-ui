<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "../Icon.svelte";
	import { twMerge } from "tailwind-merge";
	import { slide } from "svelte/transition";

	let Class = "";
	export let value: string;
	export let copiedText = "Copied !";
	export let popupPosition: "right" | "left" | "center" = "center";
	export { Class as class };
	export let popupClass = "";

	let copiedTimeout: number;
	let popup: HTMLElement;
	let popupButton: HTMLElement;
	let copiedShown = false;
	let popupOpen = false;

	$: {
		if (popupOpen === false) {
			clearTimeout(copiedTimeout);
			copiedShown = false;
		}
	};

	onMount(() => {
		let listener = (event: MouseEvent) => {
			if (popup && popupButton && !popup.contains((event.target as HTMLElement)) && !popupButton.contains((event.target as HTMLElement))) {
				popupOpen = false;
			}
		};
		window.addEventListener("click", listener, {
			capture: true,
		});
		return () => {
			window.removeEventListener("click", listener);
		}
	})

</script>

<button bind:this={popupButton} class={twMerge("text-ellipsis whitespace-nowrap overflow-hidden hover:text-brand-text", Class)} on:click={() => popupOpen = !popupOpen}>
	{value}
</button>
{#if popupOpen}
	<div transition:slide={{axis: "y", duration: 150 }} bind:this={popup} class={twMerge("absolute z-[1] right-0 top-[calc(100%+0.5rem)] flex flex-col items-end gap-2 mx-auto w-fit", popupClass)}
		style:right={popupPosition !== "left" ? "0" : "unset"}
		style:left={popupPosition !== "right" ? "0" : "unset"}
	>
		<div class="main flex gap-2 p-4 text-primary-text bg-hash-surface rounded-base border border-secondary-border shadow-[0px_2px_13px_0px_rgba(0,0,0,0.1)] w-full">
			<div class="break-words min-w-0">{value}</div>
			<button class="flex-shrink-0 p-1 flex h-fit border-none" on:click={() => {
				clearTimeout(copiedTimeout);
				copiedShown = true;
				navigator.clipboard.writeText(value);
				copiedTimeout = window.setTimeout(() => {
					copiedShown = false;
				}, 1000)
			}}>
				<svg name="content-copy" class="text-brand-text" width="20" height="20">
					<use href="/images/icons.svg#icon-content-copy" />
				</svg>
			</button>
		</div>
		{#if copiedShown}
			<div transition:slide={{axis: "y", duration: 150 }} class="flex value-copied absolute top-[calc(100%+0.5rem)] right-0 select-none bg-[#56AC30] text-white min-w-0 items-center rounded-[6px] gap-1 p-[10px] whitespace-nowrap text-nowrap">
				<Icon name="check-circle"></Icon>
				{copiedText}
			</div>
		{/if}
	</div>
{/if}