<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
	import type { SubmitFunction } from './$types';

	let loading = false;
	let finished = false;
	let error: string = '';
	let errors: Record<string, boolean> = {};

	const handleFormSubmit: SubmitFunction = () => {
		error = '';
		errors = {};
		loading = true;

		return async ({ result: { data, type }, update }) => {
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
	<title>Sign up - Saferwall Beta 1.0</title>
</svelte:head>

{#if finished}
	<AuthActionDone
		title="Confirm your registration !"
		description="We’ve sent a link to the email you specified"
	/>
{:else}
	<form
		method="POST"
		use:enhance={handleFormSubmit}
		class="flex flex-col space-y-6 px-10 lg:px-16 pt-14"
	>
		<h1 class="text-3xl font-bold">Sign up</h1>

		{#if error}
			<Alert type="error" on:close={() => (error = '')}>{error}</Alert>
		{/if}
		<div class="space-y-4">
			<Input required error={errors.email} label="Username" name="username" disabled={loading} />
			<Input
				required
				error={errors.username}
				label="Email"
				type="email"
				name="email"
				disabled={loading}
			/>
			<Input
				required
				error={errors.password}
				label="Password"
				type="password"
				name="password"
				disabled={loading}
			/>
		</div>
		<label class="flex items-center space-x-2 text-xs">
			<input type="checkbox" required disabled={loading} name="agree" />
			<p>
				I agree to the <a href="/pages/terms-of-service" target="_blank" class="link"
					>Terms of Service</a
				>
			</p>
		</label>
		<Button type="submit" {loading} theme="brand" size="lg">Create account</Button>
	</form>
	<div class="border-t border-neutral-500 p-6">
		<p class="text-center text-xs">
			already have an account ? <a href="/auth/login" class="link">Sign In</a>
		</p>
	</div>
{/if}
