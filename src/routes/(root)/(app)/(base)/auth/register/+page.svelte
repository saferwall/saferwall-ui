<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
	import type { SubmitFunction } from './$types';
	import CheckBox from '$lib/components/form/CheckBox.v2.svelte';
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

		return async ({ result, update, action, formData, formElement }) => {
			let { type } = result;
			// @ts-ignore
			let data: Record<string, any> = result.data;

			console.log({result, action, formData, formElement})
			loading = false;

			if (type === 'failure') {
				errors = data;
				error = data.message;
				return;
			}

			finished = true;
			update();
		};
	};

</script>

<svelte:head>
	<title>Sign up - Saferwall 1.0</title>
</svelte:head>

{#if finished}
	<AuthActionDone
		title="Confirm your registration !"
		image="image-email-sent"
		imageClass="size-14"
	>
		<p class="text-center">An email has been sent to
			<a href={redirectToEmailProvider(email)} class="text-brand-text">{email}</a><br>
		to confirm your registration.</p>
	</AuthActionDone>
{:else}
	<form
		method="POST"
		use:enhance={handleFormSubmit}
		class="flex flex-col space-y-6 px-10 pt-9"
	>
		<h1 class="text-3xl font-bold">Sign up</h1>

		{#if error}
			<Alert type="error" on:close={() => (error = '')}>{error}</Alert>
		{/if}
		<div class="space-y-4">
			<Input class="border-primary-border px-3 pt-7" labelClass="left-3 border-l border-transparent" required error={errors.email} label="Username" name="username" disabled={loading} />
			<Input class="border-primary-border px-3 pt-7" labelClass="left-3 border-l border-transparent"
				required
				error={errors.username}
				label="Email"
				type="email"
				name="email"
				disabled={loading}
				bind:value={email}
			/>
			<Input class="border-primary-border px-3 pt-7" labelClass="left-3 border-l border-transparent"
				required
				error={errors.password}
				label="Password"
				type="password"
				starsForBullets={true}
				name="password"
				disabled={loading}
			/>
		</div>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="flex items-center space-x-2 text-xs">
			<CheckBox class="border-[1px]" required disabled={loading} name="agree"/>
			<p>
				I agree to the <a href="/pages/terms-of-service" target="_blank" class="link"
					>Terms of Service</a
				>
			</p>
		</label>
		<Button type="submit" {loading} theme="brand" size="lg">Sign up</Button>
	</form>
	<div class="pb-6">
		<p class="text-center text-xs">
			Already have an account? <a href="/auth/login" class="link">Login</a>
		</p>
	</div>
{/if}
