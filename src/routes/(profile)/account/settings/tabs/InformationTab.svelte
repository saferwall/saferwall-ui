<script lang="ts">
	import { enhance } from '$app/forms';

	import Icon from '$lib/components/Icon.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import type { Saferwall } from '$lib/types';

	export let user: Saferwall.User;

	let error = '';
	let success = false;
	let loading = false;
</script>

<form
	method="post"
	action="?/information"
	class="space-y-4"
	use:enhance={() => {
		error = '';
		success = false;
		loading = true;
		return async ({ result }) => {
			loading = false;
			if (result.type == 'failure') {
				error = result.data?.message;
			}

			if (result.type == 'success') {
				success = true;
			}
		};
	}}
>
	<div class="relative space-y-4 flex flex-col max-w-screen-sm">
		{#if error}
			<Alert type="error" on:close={() => (error = '')}>{error}</Alert>
		{/if}
		{#if success}
			<Alert type="success" on:close={() => (success = false)}>Profile successfully updated.</Alert>
		{/if}
		<Avatar size="lg" username={user.username} >
		</Avatar>
		<!-- <button class="absolute bottom-0 right-0 bg-white p-2 rounded-full hover:cursor-pointer">
			<Icon name="cloud" />
		</button> -->
		<Input label="Username" name="username" value={user.username} readonly />
		<Input label="Name" name="name" value={user.name} />
		<Input label="URL" name="url" value={user.url} />
		<Input label="Biography" name="bio" value={user.bio} />
		<Input label="Location" name="location" value={user.location} />
	</div>
	<Button {loading} theme="brand" size="lg" type="submit">
		Save
		<span slot="loading" class="ml-1">Saving ...</span>
	</Button>
</form>
