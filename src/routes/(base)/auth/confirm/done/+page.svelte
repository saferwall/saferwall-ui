<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Account confirmed - Saferwall Beta 1.0</title>
</svelte:head>

<AuthActionDone imageClass="size-20" image="image-circle-check" title="Congratulations !" class="gap-4" textClass="gap-3">
	<div class="flex flex-col items-center gap-4">
		<p>Your registration has been confirmed.</p>
		<Button href="/auth/login?{$page.url.searchParams.toString()}" theme="brand" size="lg" class="py-[10px] px-[25px] bg-brand-surface">Login</Button>
	</div>
</AuthActionDone>
