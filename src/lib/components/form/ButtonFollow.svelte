<script lang="ts">
	import Button from './Button.svelte';

	export let followed: boolean = false;
	export let loggedIn: boolean = false;
</script>

<Button
	class="w-full md:w-max z-30"
	href={loggedIn ? undefined : '/auth/login'}
	size="sm"
	theme={followed ? 'primary light' : undefined}
	{...$$props}
>
	<span>{followed ? 'Unfollow' : 'Follow'}</span>
</Button>
