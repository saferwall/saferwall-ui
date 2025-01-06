<script lang="ts">
	import Icon from '../Icon.svelte';

	export let hash = "";
	export let behavior_id: string | undefined;
</script>

<a
	href="/files/{hash}?behavior_id={behavior_id ?? ""}"
	class="max-w-full flex items-center gap-2 text-gray-100 bg-gray-800 hover:bg-neutral-700 rounded p-3 min-w-0 basis-0"
>
	<Icon class="size-6 flex-shrink-0" name="link" />
	<div class="flex-grow leading-5 flex-shrink bg-transparent focus:outline-none focus:border-transparent cursor-pointer overflow-hidden text-ellipsis">
		{hash}
	</div>
</a>
