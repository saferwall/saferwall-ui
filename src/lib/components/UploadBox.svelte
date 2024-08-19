<script lang="ts">
	import type { QueueFile } from '$lib/types';

	import { SaferwallClient } from '$lib/clients/saferwall';
	import { UploadStatus } from '$lib/config';
	import UploadFileStatus from './UploadFileStatus.svelte';
	import ButtonBrowse from './form/ButtonBrowse.svelte';

	export let client: SaferwallClient;
	export let loggedIn = false;

	let inputFiles: HTMLElement;

	const selectFiles = () => (loggedIn ? inputFiles.click() : null);
	const onFilesChanges = (e: Event & any) => {
		for (const file of [...e.target.files]) {
			processToQueue(file);
		}
		(inputFiles as HTMLFormElement).value = '';
	};

	$: queueFiles = [] as QueueFile[];
	$: triggerQueueUpdate = () => (queueFiles = queueFiles.sort((qA, qB) => qA.status - qB.status));

	const processToQueue = (file: File) => {
		const queue: QueueFile = {
			file,
			status: UploadStatus.UPLOADING,
			uploadFile: () => {},
			updateStatus: () => {}
		};

		queue.uploadFile = () => {
			queue.error = undefined;

			client
				.uploadFile(file)
				.then(({ status, sha256 }) => {
					queue.hash = sha256;
					queue.status = status || UploadStatus.UPLOADING;
					const reCheckStatus = () => setTimeout(() => queue.updateStatus(), 2000);
					queue.updateStatus = () => {
						client
							.getFileStatus(sha256)
							.then((status) => {
								queue.status = status;
								queueFiles = [...queueFiles];

								if (status < UploadStatus.FINISHED) {
									reCheckStatus();
								}
							})
							.catch(() => reCheckStatus());
					};

					queue.updateStatus();

					triggerQueueUpdate();
				})
				.catch(async (err) => {
					const body = await err.json();
					queue.error = body.message;
					triggerQueueUpdate();
				});

			triggerQueueUpdate();
		};
		queue.uploadFile();

		queueFiles = [...queueFiles, queue];
		triggerQueueUpdate();
	};
</script>

<section
	class="bg-white dark:bg-menu-surface rounded-card p-8 md:p-12 flex flex-col justify-between space-y-6"
>
	<input class="hidden" type="file" multiple bind:this={inputFiles} on:change={onFilesChanges} />

	<div class="flex min-h-[300px] flex-col items-center justify-center space-y-6">
		<div class="m-auto w-max h-max">
			<ButtonBrowse href={loggedIn ? undefined : '/auth/login'} on:click={selectFiles} />
		</div>

		<div class="flex flex-col w-full space-y-2">
			{#each queueFiles as queue}
				<UploadFileStatus
					hash={queue.hash}
					file={queue.file}
					error={queue.error}
					status={queue.status}
					on:reupload={() => queue.uploadFile()}
				/>
			{/each}
		</div>
	</div>

	<div class="m-auto text-center max-w-screen-md">
		<p class="text-xs md:text-base md:px-8">
			By using Saferwall you consent to our
			<a class="link" target="_blank" rel="noreferrer" href="/pages/terms-of-service">
				Terms of Service
			</a>
			and
			<a class="link" target="_blank" rel="noreferrer" href="/pages/privacy-and-policy">
				Privacy Policy
			</a> and allow us to share your submission with the security community. Learn more
		</p>
	</div>
</section>
