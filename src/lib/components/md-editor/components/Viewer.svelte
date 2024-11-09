<script lang="ts">
	import "../css/github-markdown.css"
    import { systemPrefersDarkMode, type ColorTheme } from "../util.ts";
    import { onMount } from "svelte";
    import { twMerge } from "tailwind-merge";
	import { processor } from "../viewer_processor.ts";

	export let value: string;
	export let theme: ColorTheme = "system";
	export { Class as class };
	let Class = "";

	$: realTheme = theme !== "system" ? theme : (["light", "dark"] as const)[Number($systemPrefersDarkMode.matches)];

	let mdToHtml = "";
	$: {
		(async () => {
			mdToHtml = (await processor.process(value)).toString();
		})()
	}
</script>

<div class={twMerge("markdown-body md-to-html p-2 h-full *:text-nowrap overflow-x-auto", Class)} data-theme={realTheme}>
	{@html mdToHtml}
</div>

<style lang="postcss">
</style>