<script lang="ts">
	import { FILE_UPLOAD_STATUS, UploadStatus } from '$lib/config';
	import { convertBytes } from '$lib/utils/format';
	import { createEventDispatcher } from 'svelte';

	import Alert from './Alert.svelte';
	import InputHash from './form/InputHash.svelte';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();

	export let error: string | undefined;
	export let hash: string | undefined;
	export let file: File;
	export let status: number;

	$: statusItem = FILE_UPLOAD_STATUS.find((s) => status === s.value);
	$: progress = (((statusItem?.value || UploadStatus.UPLOADING) + 1) / UploadStatus.FINISHED) * 100;
</script>

<article class="flex flex-col w-fill space-y-2 p-4 border rounded-xl" class:error>
	<div class="flex justify-between">
		<p>
			<span>File:</span> <strong>{file.name}</strong>
			<span class="text-xs">({convertBytes(file.size)})</span>
		</p>
		<div
			class={`flex items-center space-x-1 font-bold ${
				error ? 'error' : 'label--' + (statusItem?.value || UploadStatus.UPLOADING)
			}`}
		>
			{#if progress < 100 && !error}
				<Icon name="restart" class="animate-spin" />
			{/if}
			<span>{error ? 'Failed' : statusItem?.title || 'Unknown'}</span>
		</div>
	</div>

	{#if hash}
		<InputHash {hash} />
	{/if}

	<div class="progress w-full h-2 relative bg-gray-200 rounded-xl overflow-hidden">
		<div
			class={`h-full status--${statusItem?.value || UploadStatus.UPLOADING}`}
			style={`width: ${progress}%`}
		/>
	</div>

	{#if error}
		<Alert type="error" icon="restart" on:close={() => dispatch('reupload')}>{error}</Alert>
	{/if}
</article>

<style lang="scss">
	.progress {
		@apply bg-gray-600;
	}
	.error {
		@apply text-red-500;
	}
	.status--0 {
		@apply bg-yellow-500;
	}
	.label--0 {
		@apply text-yellow-500;
	}
	.status--1 {
		@apply bg-green-500;
	}
	.label--1 {
		@apply text-green-500;
	}
	.status--2 {
		@apply bg-blue-600;
	}
	.label--2 {
		@apply text-blue-600;
	}
	.status--3 {
		@apply bg-cyan-500;
	}
	.label--3 {
		@apply text-cyan-500;
	}
	.status--4 {
		@apply bg-green-600;
	}
	.label--4 {
		@apply text-green-600;
	}
</style>
