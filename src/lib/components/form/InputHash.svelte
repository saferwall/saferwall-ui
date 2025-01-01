<script lang="ts">
	import { page } from '$app/stores';
	import { copyToClipboard } from '$lib/utils';
	import Icon from '../Icon.svelte';

	export let hash = "";
	export let behavior_id: string | undefined;
	$: url = `${$page.url}files/${hash}?behavior_id=${behavior_id ?? ""}`;

	let copied: number | undefined;
	const onCopyClick = async (event: MouseEvent) => {
		event.preventDefault();

		clearTimeout(copied);
		if (await copyToClipboard(url)) {
			copied = window.setTimeout(() => (copied = undefined), 1000);
		}
	};
</script>

<a
	href="/files/{hash}?behavior_id={behavior_id ?? ""}"
	class="max-w-full flex items-center text-gray-100 bg-gray-800 hover:bg-neutral-700 rounded px-4 space-x-2 min-w-0 basis-0"
>
	<button
		type="button"
		on:click={onCopyClick}
		class="hover:text-primary outline-none bg-transparent"
	>
		<Icon class="size-[1.1rem]" name={copied ? 'check-line' : 'copy'} />
	</button>
	<div class="flex-grow flex-shrink py-2.5 bg-transparent focus:outline-none focus:border-transparent cursor-pointer overflow-hidden text-ellipsis">
		{hash}
	</div>
</a>
