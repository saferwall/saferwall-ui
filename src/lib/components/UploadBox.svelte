<script lang="ts">
	import { APIClient } from '$lib/api';
	import { UploadStatus } from '$lib/config';
	import type { QueueFile, Session } from '$lib/types';
	import UploadFileStatus from './UploadFileStatus.svelte';
	import ButtonBrowse from './form/ButtonBrowse.svelte';

	export let session: Session;
	export let loggedIn: boolean = false;
	let queueFiles: QueueFile[] = [];

	let inputFiles: HTMLElement;

	const selectFiles = () => (loggedIn ? inputFiles.click() : null);
	const onFilesChanges = (e: Event & any) => {
		for (const file of [...e.target.files]) {
			processToQueue(file);
		}
		(inputFiles as HTMLFormElement).value = '';
	};
	const triggerQueueUpdate = () =>
		(queueFiles = queueFiles.sort((qA, qB) => qA.status - qB.status));

	const client = new APIClient(session);
	const processToQueue = (file: File) => {
		const queue: QueueFile = {
			file: file,
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
					queue.status = (status || UploadStatus.UPLOADING) + UploadStatus._START;
					const reCheckStatus = () => setTimeout(() => queue.updateStatus(), 2000);
					queue.updateStatus = () => {
						client
							.getFileStatus(sha256)
							.then((status) => {
								queue.status = status + UploadStatus._START;

								if (status !== UploadStatus.FINISHED - UploadStatus._START) {
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

		queueFiles.push(queue);
		triggerQueueUpdate();
	};
</script>

<section class="bg-white rounded-xl shadow p-8 md:p-12 flex flex-col justify-between space-y-6">
	<h1 class="text-xl font-medium">Welcome to Saferwall</h1>

	<input class="hidden" type="file" multiple bind:this={inputFiles} on:change={onFilesChanges} />

	<div class="flex min-h-[300px] flex-col items-center justify-center space-y-6">
		<div class="m-auto w-max h-max">
			<ButtonBrowse href={loggedIn ? undefined : '/auth/login'} on:mouseup={selectFiles} />
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
		<p class="text-sm md:text-base md:px-8">
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
