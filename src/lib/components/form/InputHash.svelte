<script lang="ts">
	import { page } from '$app/stores';
	import { copyToClipboard } from '$lib/utils';
	import Icon from '../Icon.svelte';

	export let hash = '';
	$: url = `${$page.url}files/${hash}`;

	let copied: number | undefined;
	const onCopyClick = async (event: MouseEvent) => {
		event.preventDefault();

		clearTimeout(copied);
		if (await copyToClipboard(url)) {
			copied = setTimeout(() => (copied = undefined), 1000);
		}
	};
</script>

<a href="/files/{hash}" class="w-full flex items-center bg-neutral-100 rounded px-4 space-x-2">
	<button
		type="button"
		on:click={onCopyClick}
		class="hover:text-primary text-neutral-500 outline-none"
	>
		<Icon class="w-3 h-3" name={copied ? 'check-line' : 'copy'} />
	</button>
	<input
		class="w-full py-2.5 bg-transparent focus:outline-none cursor-pointer"
		type="text"
		value={hash}
		readonly
	/>
</a>
