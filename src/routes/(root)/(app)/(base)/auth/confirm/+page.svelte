<script lang="ts">
	import { enhance } from '$app/forms';
	import Alert from '$lib/components/Alert.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
	import type { SubmitFunction } from './$types';
	import { page } from '$app/stores';

	let loading = false;
	let finished = false;
	let error: string = '';
	let errors: Record<string, boolean> = {};

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

	let email = $page.url.searchParams.get("id") || "";
</script>

<svelte:head>
	<title>Confirm account - Saferwall 1.0</title>
</svelte:head>

{#if finished}
	<AuthActionDone title="Confirmation email sent" imageClass="size-14">
		<p class="text-center">If your email is in our system, you will receive instructions to reset your password shortly.</p>
	</AuthActionDone>
{:else}
	<form
		use:enhance={handleFormSubmit}
		method="POST"
		class="flex flex-col gap-4 px-[40px] py-[35px]"
	>
		<h1 class="text-2xl font-bold">Didn’t confirm registration ?</h1>
		{#if error}
			<Alert type="error" on:close={() => (error = '')}>{error}</Alert>
		{/if}
		<p>
			Enter your account email address and we’ll send you a link to confirm your email.
		</p>
		<div class="space-y-4">
			<Input
				value={email}
				class="border-primary-border"
				required
				error={errors.email}
				label="Email"
				type="email"
				name="email"
				disabled={loading}
			/>
		</div>
		<Button {loading} type="submit" theme="brand" size="lg">Send confirmation</Button>
	</form>
{/if}
