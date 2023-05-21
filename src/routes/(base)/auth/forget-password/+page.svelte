<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import { enhance } from '$app/forms';

	let finished = false;
	let loading = false;
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
	<title>Forgot password - Saferwall</title>
</svelte:head>

{#if finished}
	<AuthActionDone
		title="Email sent !"
		description="If your email is in our system, you will receive <br />instructions to reset your password shortly."
	/>
{:else}
	<form
		method="POST"
		use:enhance={handleFormSubmit}
		class="flex flex-col space-y-6 px-10 lg:px-16 py-14"
	>
		<h1 class="text-3xl font-bold">Forgot password</h1>
		{#if error}
			<Alert type="error" on:close={() => (error = '')}>{error}</Alert>
		{/if}
		<p class="text-grayx-700">
			We have just sent a confirmation link of your account to the email address.
		</p>
		<div class="space-y-4">
			<Input
				required
				error={errors.email}
				label="Email"
				type="email"
				name="email"
				disabled={loading}
			/>
		</div>
		<Button {loading} type="submit" theme="primary" size="lg">Login</Button>
	</form>
{/if}
