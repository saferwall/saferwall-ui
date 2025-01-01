<script lang="ts">
	import { page } from '$app/stores';
	import AuthActionDone from '$lib/components/AuthActionDone.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { env } from '$env/dynamic/public';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (browser ) {
			fetch(`${env.PUBLIC_API_URL}auth/verify-account${$page.url.search}`)
			.then(res => {
				if (res.status == 200)
					goto(`/auth/confirm/done?id=${encodeURIComponent($page.url.searchParams.get("id") || "")}`)
				else
					goto(`/auth/confirm/expired?id=${encodeURIComponent($page.url.searchParams.get("id") || "")}`)
			}).catch(err => {
				goto(`/auth/confirm/expired?id=${encodeURIComponent($page.url.searchParams.get("id") || "")}`)
			})
		}
	})
</script>

<svelte:head>
	<title>Verify account - Saferwall Beta 1.0</title>
</svelte:head>

<AuthActionDone
	imageClass="size-20 text-brand-text animate-spin"
	image={"icon-loading"}
	title={"Verifying..."}
	class="gap-0"
>
	<div class="flex flex-col items-center gap-4">
		<p class="text-center">Please wait while we verify your account, this will only take a few seconds.</p>
	</div>
</AuthActionDone>
