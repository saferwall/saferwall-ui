<script lang="ts">
	import { enhance } from '$app/forms';

	import Input from '$lib/components/form/Input.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Alert from '$lib/components/Alert.svelte';

	let error = '';
	let success = false;
	let loading = false;
</script>

<form
	method="post"
	action="?/email"
	class="space-y-4"
	use:enhance={() => {
		error = '';
		success = false;
		loading = true;

		return async ({ result, form }) => {
			loading = false;
			if (result.type === 'failure') {
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
			<Alert type="success" on:close={() => (success = false)}>Email successfully updated.</Alert>
		{/if}
		<Input label="Email" name="email" type="email" required />
		<Input label="Password" name="password" type="password" required />
	</div>
	<Button {loading} theme="primary" size="lg" type="submit">
		Change
		<span slot="loading" class="ml-1">Saving ...</span>
	</Button>
</form>
