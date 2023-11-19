<script lang="ts">
	import { enhance } from '$app/forms';
	import Alert from '$lib/components/Alert.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';

	let loading = false;
	let finished = false;
	let error: string = '';
	let errors: Record<string, boolean> = {};

	const handleFormSubmit = (_event: any) => {
		error = '';
		errors = {};
		loading = true;

		return async ({ result, update }: any) => {
			const { data, type } = result;
			loading = false;

			if (type === 'failure') {
				errors = data;
				error = data?.message;

				return;
			}

			finished = true;
			update();
		};
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
		<Button href="/auth/login" theme="primary" size="lg">Login</Button>
	</AuthActionDone>
{:else}
	<form
		method="POST"
		use:enhance={handleFormSubmit}
		class="flex flex-col space-y-6 px-10 lg:px-16 py-14"
	>
		<h1 class="text-3xl font-bold">New password</h1>
		{#if error}
			<Alert type="error" on:close={() => (error = '')}>{error}</Alert>
		{/if}
		<p class="text-neutral-700">Enter your new password</p>
		<div class="space-y-4">
			<Input
				required
				error={errors.password}
				label="New Password"
				type="password"
				name="password"
				disabled={loading}
			/>
		</div>
		<Button {loading} type="submit" theme="primary" size="lg">Change password</Button>
	</form>
{/if}
