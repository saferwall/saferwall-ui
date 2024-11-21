<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';
	import { redirectToEmailProvider } from '$lib/utils/redirectToEmailProvider';

	let loading = false;
	let finished = false;
	let error: string = '';
	let errors: Record<string, boolean> = {};
	let email = "";

	const handleFormSubmit: SubmitFunction = () => {
		error = '';
		errors = {};
		loading = true;

		return async ({ result, update }) => {
			loading = false;

			if (result.type === 'failure') {
				let data: Record<string, any> = result.data!;
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
	<title>Forgot password - Saferwall Beta 1.0</title>
</svelte:head>

{#if finished}
	<AuthActionDone title="Email sent" imageClass="size-14">
		<p class="text-center">An email has been sent to
			<a href={redirectToEmailProvider(email)} class="text-brand-text">{email}</a><br>
			to reset your password.</p>
	</AuthActionDone>
{:else}
	<form
		method="POST"
		use:enhance={handleFormSubmit}
		class="flex flex-col space-y-6 px-[40px] py-[35px]"
	>
		<h1 class="text-3xl font-bold">Forgot password ?</h1>
		{#if error}
			<Alert type="error" on:close={() => (error = '')}>{error}</Alert>
		{/if}
		<p>
			Enter your account email address and we will send you a link to reset your password.
		</p>
		<div class="space-y-4">
			<Input
				bind:value={email}
				class="border-primary-border placeholder:text-secondary-text"
				required
				error={errors.email}
				label="Email"
				type="email"
				name="email"
				disabled={loading}
			/>
		</div>
		<Button {loading} type="submit" theme="brand" size="lg">Request password reset</Button>
	</form>
{/if}
