<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "../Icon.svelte";
	import { twMerge } from "tailwind-merge";
	import { slide } from "svelte/transition";

	let Class = "";
	export let popupPosition: "right" | "left" | "center" = "center";
	export { Class as class };
	export let popupClass = "";

	let popup: HTMLElement;
	export let popUnderOpen = false;

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

</script>

<div class="relative flex flex-col" bind:this={popup}>
	<button on:click={() => popUnderOpen = !popUnderOpen} class="border-none">
		<slot class={twMerge("text-ellipsis whitespace-nowrap overflow-hidden hover:text-brand-text", Class)} name="clickable"></slot>
	</button>
	{#if popUnderOpen}
		<div transition:slide={{axis: "y", duration: 150 }} class={twMerge("absolute z-[1] right-0 top-[calc(100%+0.5rem)] flex flex-col items-end gap-2 mx-auto w-fit", popupClass)}
			style:right={popupPosition !== "left" ? "0" : "unset"}
			style:left={popupPosition !== "right" ? "0" : "unset"}
		>
			<slot name="dropdown"></slot>
		</div>
	{/if}
</div>