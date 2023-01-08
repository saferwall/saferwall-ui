<script lang="ts">
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';

	let loading = false;
	let finished = false;
	const handleFormSubmit = (event: Event) => {
		event.preventDefault();

		loading = true;
		setTimeout(() => {
			loading = false;
			finished = true;
		}, 2000);
	};
</script>

<svelte:head>
	<title>New password - Saferwall</title>
</svelte:head>

{#if finished}
	<AuthActionDone
		imageSize="w-24 h-24"
		image="illustration-done"
		title="Congratulation !"
		description="Your password has been successfully reset."
	>
		<Button href="/auth/login" theme="primary" size="large">Login</Button>
	</AuthActionDone>
{:else}
	<form
		method="POST"
		on:submit={handleFormSubmit}
		class="flex flex-col space-y-6 px-10 lg:px-16 py-14"
	>
		<h1 class="text-3xl font-bold">New password</h1>
		<p class="text-grayx-700">Enter your new password</p>
		<div class="space-y-4">
			<Input name="password" type="password" required label="New password" disabled={loading} />
		</div>
		<Button {loading} type="submit" theme="primary" size="large">Change password</Button>
	</form>
{/if}
