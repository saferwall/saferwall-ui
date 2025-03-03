<script lang="ts">
	import { FILE_UPLOAD_STATUS, UploadStatus } from '$lib/config';
	import { convertBytes } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	import Alert from './Alert.svelte';
	import InputHash from './form/InputHash.svelte';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();

	export let file: File;
	export let status: number;
	export let error: string | undefined = undefined;
	export let hash: string | undefined = undefined;

	$: itemStatus = FILE_UPLOAD_STATUS.find((s) => status === s.value);
	$: currentStatus = itemStatus?.value ?? UploadStatus.QUEUEING;
	$: progress = (currentStatus / UploadStatus.FINISHED) * 100;

	const onAlertClose = () => {
		dispatch('reupload');
	};
</script>

<article
	class="flex flex-col w-fill space-y-2 p-4 border border-primary-border rounded-xl"
	class:error
>
	<div class="flex justify-between">
		<p>
			<span>File:</span> <strong>{file.name}</strong>
			<span class="text-xs">({convertBytes(file.size)})</span>
		</p>
		<div
			class={`flex items-center space-x-1 font-bold ${error ? 'error' : 'label--' + currentStatus}`}
		>
			{#if progress < 100 && !error}
				<Icon name="restart" class="animate-spin" />
			{/if}
			<span>{itemStatus?.title || 'Unknown'}</span>
		</div>
	</div>

	{#if hash}
		<InputHash {hash} behavior_id="" />
	{/if}

	<div class="progress w-full h-2 relative bg-tertiary-surface rounded-xl overflow-hidden">
		<div class={`h-full status--${currentStatus}`} style={`width: ${progress}%`} />
	</div>

	{#if error}
		<Alert type="error" icon="restart" on:close={onAlertClose}>{error}</Alert>
	{/if}
</article>

<style lang="postcss">
	.progress {
		@apply bg-gray-600;
	}
	.error {
		@apply text-red-500;
	}
	.status {
		&---1 {
			@apply bg-red-500;
		}
		&--0 {
			@apply bg-yellow-500;
		}
		&--1 {
			@apply bg-blue-600;
		}
		&--2 {
			@apply bg-green-500;
		}

		&--3 {
			@apply bg-cyan-500;
		}
	}

	.label {
		&---1 {
			@apply text-red-500;
		}
		&--0 {
			@apply text-yellow-500;
		}
		&--1 {
			@apply text-blue-600;
		}
		&--2 {
			@apply text-green-500;
		}

		&--3 {
			@apply text-cyan-500;
		}
	}
</style>
