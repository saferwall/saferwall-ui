<script lang="ts">
	import "../css/github-markdown.css"
    import { type ColorTheme } from "../util.ts";
    import { onMount } from "svelte";
	import Worker from "../viewer_worker?worker"
    import { WorkerWrapper } from "../worker_wrapper.ts";
    import { twMerge } from "tailwind-merge";
	import { systemPrefersDarkMode } from "$lib/stores/theme.ts";

	export let value: string;
	export let theme: ColorTheme = "system";
	export { Class as class };
	let Class = "";

	$: realTheme = theme !== "system" ? theme : (["light", "dark"] as const)[Number($systemPrefersDarkMode.matches)];

	let worker: WorkerWrapper<string, string>;
	let mdToHtml = "";
		
	$: {
		worker?.postMessage(value)
	};
		
	onMount(() => {
		worker = new WorkerWrapper(Worker);
		worker.onmessage = (e) => {
			mdToHtml = e.data;
		};
		return () => {
			worker?.terminate();
		}
	})

</script>

<div class={twMerge("markdown-body md-to-html p-2 h-full *:text-nowrap overflow-x-auto", Class)} data-theme={realTheme}>
	{@html mdToHtml}
</div>

<style lang="postcss">
</style>