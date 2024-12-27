<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Alert from '$lib/components/Alert.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import type { SubmitFunction } from './$types';

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
</script>

<svelte:head>
	<title>New password - Saferwall Beta 1.0</title>
</svelte:head>

{#if finished}
	<AuthActionDone
		imageClass="size-20"
		image="image-circle-check"
		title="Congratulations !"
		class="gap-0"
	>
		<div class="flex flex-col items-center gap-4">
			<p>Your password has been successfully reset.</p>
			<Button href="/auth/login?id={$page.url.searchParams.get("id") || ""}" theme="brand" size="lg" class="py-[10px] px-[25px] bg-brand-surface">Login</Button>
		</div>
	</AuthActionDone>
{:else}
	<form
		method="POST"
		use:enhance={handleFormSubmit}
		class="flex flex-col gap-4 px-[40px] py-[35px]"
	>
		<h1 class="text-2xl font-bold">New password</h1>
		{#if error}
			<Alert type="error" on:close={() => (error = '')}>{error}</Alert>
		{/if}
		<p>Enter your new password.</p>
		<div class="space-y-4">
			<Input
				class="border-primary-border"
				required
				error={errors.password}
				label="New Password"
				starsForBullets
				type="password"
				name="password"
				disabled={loading}
			/>
		</div>
		<Button {loading} type="submit" theme="brand" size="lg">Reset password</Button>
	</form>
{/if}
