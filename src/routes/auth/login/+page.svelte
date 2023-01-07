<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';

	let loading = false;
	const handleFormSubmit = (event: Event) => {
		event.preventDefault();

		loading = true;
		setTimeout(() => {
			loading = false;
		}, 2000);
	};
</script>

<svelte:head>
	<title>Sign in - Saferwall</title>
</svelte:head>

<form
	method="POST"
	on:submit={handleFormSubmit}
	class="flex flex-col space-y-6 px-10 lg:px-16 py-14"
>
	<h1 class="text-3xl font-bold">Sign in</h1>
	<div class="space-y-4">
		<Input label="Username or email" required name="username" disabled={loading} />
		<Input label="Password" required type="password" name="password" disabled={loading} />
	</div>
	<a href="/auth/forget-password" class="self-end border-l-pink-50">Forget password?</a>

	<Button theme="primary" type="submit" {loading} size="large">Login</Button>

	<p class="text-center text-sm">
		Didn't confirm registration? <a href="/auth/confirm" class="link">Send confirmation</a>
	</p>
</form>
<div class="border-t border-grayx-100 p-6">
	<p class="text-center text-sm">
		Not a member ? <a href="/auth/register" class="link">Create your account</a>
	</p>
</div>
