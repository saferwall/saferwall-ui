<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './Button.svelte';

	export let username: string;
	export let followed = false;
	export let loggedIn = false;

	let loading = false;
</script>

<form
	action="/actions?/follow"
	method="post"
	use:enhance={({ formData }) => {
		loading = true;

		formData.append('username', username);
		formData.append('follow', followed ? 'unfollow' : 'follow');

		return async ({ result }) => {
			loading = false;

			if (result.type === 'success') {
				// @ts-ignore
				followed = result.data?.follow;
			}
		};
	}}
>
	<Button
		size="sm"
		type="submit"
		class="w-full md:w-max z-30"
		href={loggedIn ? undefined : '/app/auth/login'}
		theme={followed ? 'brand' : 'base'}
		{loading}
		{...$$restProps}
	>
		<span>{followed ? 'Unfollow' : 'Follow'}</span>
		<div slot="loading">
			{followed ? 'Unfollow' : 'Follow'}ing...
		</div>
	</Button>
</form>
