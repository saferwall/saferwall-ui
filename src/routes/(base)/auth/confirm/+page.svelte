<script lang="ts">
	import { enhance } from '$app/forms';
	import Alert from '$lib/components/Alert.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';

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

				if (data.error) {
					error = data.error.message;
				}

				return;
			}

			finished = true;
			update();
		};
	};
</script>

<svelte:head>
	<title>Confirm account - Saferwall</title>
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
		<h1 class="text-3xl font-bold">Didn’t confirm registration ?</h1>
		{#if error}
			<Alert type="error" on:close={() => (error = '')}>{error}</Alert>
		{/if}
		<p class="text-grayx-700">
			Enter your account email address and we’ll send you a link to confirm your email.
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
		<Button {loading} type="submit" theme="primary" size="lg">Send confirmation</Button>
	</form>
{/if}
