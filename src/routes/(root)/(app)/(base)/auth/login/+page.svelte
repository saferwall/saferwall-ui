<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	let loading = false;
	let error: string = '';
	let errors: Record<string, boolean> = {};
	let id = $page.url.searchParams.get("id") || ""

	const handleFormSubmit: SubmitFunction = () => {
		error = '';
		errors = {};
		loading = true;
		
		// @ts-ignore
		return async ({ result, update }) => {
			
			if (result.type === 'failure') {
				let data: Record<string, any> = result.data!;
				errors = data;
				error = data?.message;
				loading = false;
				
				return;
			}

			update();
		};
	};

</script>

<svelte:head>
	<title>Login - Saferwall Beta 1.0</title>
</svelte:head>

<form
	method="POST"
	use:enhance={handleFormSubmit}
	class="flex flex-col space-y-6 px-10 pt-9"
>
	<h1 class="text-3xl font-bold">Login</h1>
	{#if error}
		<Alert type="error" on:close={() => (error = '')}>{error}</Alert>
	{/if}
	<div class="space-y-4 ">
		<Input class="border-primary-border placeholder:text-secondary-text" label="Username or Email" name="username" error={errors.username} disabled={loading} value={id}/>
		<Input class="border-primary-border placeholder:text-secondary-text"
			label="Password"
			type="password"
			starsForBullets={true}
			name="password"
			error={errors.password}
			disabled={loading}
		/>
	</div>
	<a href="/auth/forgot-password" class="self-end border-l-pink-50">Forgot password?</a>

	<Button theme="brand" type="submit" {loading} size="lg">Login</Button>

	<p class="text-center text-xs">
		Didn't confirm registration? <a href="/auth/confirm" class="link">Send confirmation</a>
	</p>
</form>
<div class="border-t border-line-surface py-6">
	<p class="text-center text-xs">
		Not a member? <a href="/auth/register" class="link">Sign up</a>
	</p>
</div>
