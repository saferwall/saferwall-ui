<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Account confirmed - Saferwall 1.0</title>
</svelte:head>

<AuthActionDone imageClass="size-20" image="image-dead-robot" title="This link has expired" class="gap-4" textClass="gap-3">
	<div class="flex flex-col items-center gap-4">
		<p class="text-center">Please click the button below to receive a new confirmation email for your registration.</p>
		<Button href="/auth/confirm?{$page.url.searchParams.toString()}" theme="brand" size="lg" class="py-[10px] px-[25px] bg-brand-surface">
			Resend a new confirmation link
		</Button>
	</div>
</AuthActionDone>
