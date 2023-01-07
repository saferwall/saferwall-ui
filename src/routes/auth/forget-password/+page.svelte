<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import AuthMailSent from '$lib/components/AuthMailSent.svelte';

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
	<title>Forgot password - Saferwall</title>
</svelte:head>

{#if finished}
	<AuthMailSent
		title="Email sent !"
		description="If your email is in our system, you will receive <br />instructions to reset your password shortly."
	/>
{:else}
	<form
		method="POST"
		on:submit={handleFormSubmit}
		class="flex flex-col space-y-6 px-10 lg:px-16 py-14"
	>
		<h1 class="text-3xl font-bold">Forgot password</h1>
		<p class="text-grayx-700">
			We have just sent a confirmation link of your account to the email address.
		</p>
		<div class="space-y-4">
			<Input name="email" required label="Email" disabled={loading} />
		</div>
		<Button {loading} type="submit" theme="primary" size="large">Login</Button>
	</form>
{/if}
