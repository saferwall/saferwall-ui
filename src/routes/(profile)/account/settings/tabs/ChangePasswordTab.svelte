<script lang="ts">
	import { enhance } from '$app/forms';

	import Input from '$lib/components/form/Input.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Alert from '$lib/components/Alert.svelte';

	let error = '';
	let errors: any = {};
	let success = false;
	let loading = false;
</script>

<form
	method="post"
	action="?/password"
	class="space-y-4"
	use:enhance={({ data, cancel }) => {
		errors = {};
		error = '';
		success = false;
		loading = true;

		if (data.get('confirm_password') !== data.get('new_password')) {
			errors.confirm_password = true;
			error = "New password and confirm password don't match";

			loading = false;
			return cancel();
		}

		return async ({ result, form }) => {
			loading = false;
			if (result.type == 'failure') {
				error = result.data?.message;
			}

			if (result.type == 'success') {
				success = true;
				form.reset();
			}
		};
	}}
>
	<div class="relative space-y-4 flex flex-col max-w-screen-sm">
		{#if error}
			<Alert type="error" on:close={() => (error = '')}>{error}</Alert>
		{/if}
		{#if success}
			<Alert type="success" on:close={() => (success = false)}>Password successfully updated.</Alert
			>
		{/if}
		<Input
			label="Current Password"
			error={errors?.password}
			name="password"
			type="password"
			required
		/>
		<Input
			label="New Password"
			error={errors?.new_password}
			name="new_password"
			type="password"
			required
		/>
		<Input
			label="Confirm Password"
			error={errors?.confirm_password}
			name="confirm_password"
			type="password"
			required
		/>
	</div>
	<Button {loading} theme="brand" size="lg" type="submit">
		Change
		<span slot="loading" class="ml-1">Saving ...</span>
	</Button>
</form>
