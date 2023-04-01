<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';

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
	<title>Sign up - Saferwall</title>
</svelte:head>

{#if finished}
	<AuthActionDone
		title="Confirm your registration !"
		description="We’ve sent a link to the email you specified"
	/>
{:else}
	<form
		method="POST"
		on:submit={handleFormSubmit}
		class="flex flex-col space-y-6 px-10 lg:px-16 pt-14"
	>
		<h1 class="text-3xl font-bold">Sign up</h1>
		<div class="space-y-4">
			<Input label="Username" required name="username" disabled={loading} />
			<Input label="Email" required type="email" name="email" disabled={loading} />
			<Input label="Password" required type="password" name="password" disabled={loading} />
		</div>
		<label class="flex items-center space-x-2 text-sm">
			<input type="checkbox" required disabled={loading} name="agree" />
			<p>
				I agree to the <a href="/pages/terms-of-service" target="_blank" class="link"
					>Terms of Service</a
				>
			</p>
		</label>
		<Button type="submit" {loading} theme="primary" size="lg">Create account</Button>
	</form>
	<div class="border-t border-grayx-100 p-6">
		<p class="text-center text-sm">
			already have an account ? <a href="/auth/login" class="link">Sign In</a>
		</p>
	</div>
{/if}
