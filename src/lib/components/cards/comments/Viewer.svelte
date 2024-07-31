<script lang="ts">
	import remarkHtml from 'remark-html';
	import remarkParse from 'remark-parse';
	import remarkGfm from 'remark-gfm';
	import { unified } from 'unified';
	import "$lib/styles/github-markdown.css";
	import { systemPrefersDarkMode, Theme, theme } from "$lib/stores/theme";

	let processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkHtml);

	$: mdToHtml = processor.processSync(value).toString();
	$: isLight = $theme !== Theme.SYSTEM ? ($theme === Theme.LIGHT) : !$systemPrefersDarkMode.matches;

	export let value: string;
</script>

<div class="markdown-body bg-transparent md-to-html p-2" data-theme={isLight ? "light" : "dark"}>
	{@html mdToHtml}
</div>

<style lang="postcss">
</style>