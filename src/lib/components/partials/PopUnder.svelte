<script lang="ts">
	import { onMount } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { slide } from "svelte/transition";

	let Class = "";
	export let popupPosition: "right" | "left" | "center" = "center";
	export { Class as class };
	export let popupClass = "";
	export let parentClass = "";
	export let timeout: number | null = null

	let popup: HTMLElement;
	export let popUnderOpen = false;
	export let animate = true;

	onMount(() => {
		let listener = (event: MouseEvent) => {
			if (popup && !popup.contains((event.target as HTMLElement))) {
				popUnderOpen = false;
			}
		};
		window.addEventListener("click", listener, {
			capture: true,
		});
		return () => {
			window.removeEventListener("click", listener);
		}
	})

	let to = -1;
</script>

<div class={twMerge("relative flex flex-col", parentClass)} bind:this={popup}>
	<button on:click={() => {
		if (timeout === null) {
			popUnderOpen = !popUnderOpen
		} else {
			clearTimeout(to);
			popUnderOpen = true;
			to = window.setTimeout(() => popUnderOpen = false, timeout);
		}
	}} class="border-none">
		<slot class={twMerge("text-ellipsis whitespace-nowrap overflow-hidden hover:text-brand-text", Class)} name="clickable"></slot>
	</button>
	{#if animate}
		{#if popUnderOpen}
			<div transition:slide={{axis: "y", duration: 150 }} class={twMerge("absolute z-[1] right-0 top-[calc(100%+0.5rem)] flex flex-col items-end gap-2 mx-auto w-fit", popupClass)}
				style:right={popupPosition !== "left" ? "0" : "unset"}
				style:left={popupPosition !== "right" ? "0" : "unset"}
			>
				<slot name="dropdown"></slot>
			</div>
		{/if}
	{:else}
		{#if popUnderOpen}
		<div class={twMerge("absolute z-[1] right-0 top-[calc(100%+0.5rem)] flex flex-col items-end gap-2 mx-auto w-fit", popupClass)}
				style:right={popupPosition !== "left" ? "0" : "unset"}
				style:left={popupPosition !== "right" ? "0" : "unset"}
			>
				<slot name="dropdown"></slot>
			</div>
		{/if}
	{/if}
</div>