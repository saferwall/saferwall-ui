<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
</script>

<svelte:head>
	<title>Account confirmed - Saferwall Beta 1.0</title>
</svelte:head>

<AuthActionDone
	imageSize="w-24 h-24"
	image="illustration-done"
	title="Congratulation !"
	description="Your registration has been confirmed."
>
	<Button href="/auth/login" theme="brand" size="lg">Login</Button>
</AuthActionDone>
