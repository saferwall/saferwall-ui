<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './Button.svelte';

	export let size: string = 'sm';
	export let hash: string;
	export let liked = false;
	export let loggedIn = false;

	let loading = false;
</script>

<form
	action="/actions?/like"
	method="post"
	use:enhance={({ data }) => {
		loading = true;

		data.append('hash', hash);
		data.append('like', liked ? 'unlike' : 'like');

		return async ({ result }) => {
			loading = false;

			if (result.type === 'success') {
				liked = result.data?.like;
			}
		};
	}}
>
	<Button
		{size}
		icon="like"
		type="submit"
		class="w-full md:w-max z-30"
		href={loggedIn ? undefined : '/auth/login'}
		theme={liked ? 'primary light' : 'base'}
		{loading}
		{...$$restProps}
	>
		<div class="ml-1">{liked ? 'Unlike' : 'Like'}</div>
		<div slot="loading">
			{liked ? 'Unlike' : 'Like'}ing...
		</div>
	</Button>
</form>
