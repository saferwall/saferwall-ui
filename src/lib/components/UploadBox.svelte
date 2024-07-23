<script lang="ts">
	import type { QueueFile, Saferwall } from '$lib/types';

	import { SaferwallClient } from '$lib/clients/saferwall';
	import { UploadStatus } from '$lib/config';
	import UploadFileStatus from './UploadFileStatus.svelte';
	import ButtonBrowse from './form/ButtonBrowse.svelte';

	export let session: Saferwall.Session;
	export let loggedIn = false;
	let queueFiles: QueueFile[] = [];

	let inputFiles: HTMLElement;

	const selectFiles = () => (loggedIn ? inputFiles.click() : null);
	const onFilesChanges = (e: Event & any) => {
		[...e.target.files].forEach(processToQueue);
		(inputFiles as HTMLFormElement).value = '';
	};
	const triggerQueueUpdate = () =>
		(queueFiles = [...queueFiles.sort((qA, qB) => qA.status - qB.status)]);

	const client = new SaferwallClient(session);
	const processToQueue = (file: File, queueItemIndex: number) => {
		const queue: QueueFile = {
			file,
			status: UploadStatus.UPLOADING,
			uploadFile: () => {},
			updateStatus: () => {}
		};
		
		const removeItemAfterDelay = () => {
			setTimeout(() => { queueFiles = [...queueFiles.toSpliced(queueFiles.indexOf(queue), 1)]; }, 3000);
		}

		queue.uploadFile = () => {
			queue.error = undefined;

			client
				.uploadFile(file)
				.then(({ status, sha256 }) => {
					queue.hash = sha256;
					queue.status = status ?? queue.status;
					const reCheckStatus = () => setTimeout(() => queue.updateStatus(), 2000);
					queue.updateStatus = () => {
						client
							.getFileStatus(sha256)
							.then((status) => {
								queue.status = status;
								triggerQueueUpdate();

								if (status !== UploadStatus.FINISHED && status !== UploadStatus.FAILED) {
									reCheckStatus();
								} else {
									removeItemAfterDelay();
								}
							})
							.catch(() => reCheckStatus());
					};

					queue.updateStatus();

					triggerQueueUpdate();
				})
				.catch(async (err) => {
					queue.error = typeof err.json === "function" ? await err.json().message : err.message;
					queue.status = UploadStatus.FAILED;
					triggerQueueUpdate();
					removeItemAfterDelay();
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
			<ButtonBrowse href={loggedIn ? undefined : '/auth/login'} on:click={selectFiles} />
		</div>

		<div class="flex flex-col w-full space-y-2">
			{#each queueFiles as queue}
				<UploadFileStatus {...queue} on:reupload={() => queue.uploadFile()}
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
