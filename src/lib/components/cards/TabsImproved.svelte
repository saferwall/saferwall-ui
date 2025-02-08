<script lang="ts">
	import { twMerge } from "tailwind-merge";
	let Class = "";
	export let tabsClass = "";
	export let tabClass = "";
	export let activeTabClass = "";
	export let contentClass = "";
	export { Class as class }
	export let direction: "horizontal" | "vertical" = "vertical";
	export let tabs: string[];
	export let value: string;
</script>

<div class={twMerge("flex", direction === "vertical" ? "flex-col" : "", Class)}>
	<div class={twMerge("tabs flex border-line-surface", direction === "vertical" ? "border-b" : "border-r", tabsClass)}>
		{#each tabs as tab}
			<button class:active={tab === value}
				class={
					// "border-none border-b " +
					twMerge(
						"border-transparent p-3 font-semibold",
						direction === "vertical" ? "border-b-2 translate-y-[1px]" : "border-r-2 translate-x-[1px]",
						tabClass,
						tab === value ? "border-brand-surface text-primary-text" : "text-secondary-text",
						tab === value ? activeTabClass : "",
					)} on:click={() => value = tab}>{tab}</button>
		{/each}
	</div>
	<div class={twMerge("body__ flex flex-col items-stretch", contentClass)}>
		<slot></slot>
	</div>
</div>