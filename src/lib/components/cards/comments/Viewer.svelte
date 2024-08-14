<script lang="ts">
	import remarkHtml from 'remark-html';
	import remarkParse from 'remark-parse';
	import remarkGfm from 'remark-gfm';
	import { unified } from 'unified';
	import "$lib/styles/github-markdown.css";

	let processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkHtml);

	$: mdToHtml = processor.processSync(value).toString();

	export let value: string;
</script>

<div class="markdown-body !font-primary bg-transparent md-to-html p-2">
	{@html mdToHtml}
</div>

<style lang="postcss">
</style>