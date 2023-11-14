<script lang="ts">
	import { enhance } from '$app/forms';
	import Alert from '$lib/components/Alert.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import { redirect } from '@sveltejs/kit';

	let error = '';
	let loading = false;
	let disabled = true;
</script>

<div class="space-y-4 md:max-w-screen-sm">
	<Icon name="delete-alert" size="w-16 h-16" />

	<h1 class="text-lg font-semibold">This action is permanent</h1>
	<p class="text-neutral-700 text-lg">
		Deleting a user account is not a reversible change. Any information associated with this account
		will be removed, and cannot be recovered.
	</p>

	<form
		class="space-y-3"
		method="post"
		action="?/delete"
		use:enhance={() => {
			error = '';
			loading = true;

			return async ({ result }) => {
				loading = false;

				if (result.type == 'failure') {
					error = result.data?.message;
					return;
				}

				redirect(301, '/auth/logout');
			};
		}}
	>
		{#if error}
			<Alert type="error">{error}</Alert>
		{/if}
		<div>
			<label class="font-semibold">
				<input
					type="checkbox"
					name="confirm"
					on:change={(event) => (disabled = !event.target.checked)}
				/>
				I understand that this action cannot be undone.
			</label>
		</div>

		<Button {disabled} {loading} theme="danger" size="lg" type="submit">
			Delete account
			<span slot="loading" class="ml-1">Deleting ...</span>
		</Button>
	</form>
</div>
