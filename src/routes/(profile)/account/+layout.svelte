<script lang="ts">
	import type { LayoutData } from './$types';

	import Footer from '$lib/components/partials/Footer.svelte';
	import Header from '$lib/components/navigation/Header.svelte';
	import ProfileHeading from '$lib/components/partials/ProfileHeading.svelte';

	export let data: LayoutData;

	$: user = data.user!;
</script>

<svelte:head>
	<title>Account Settings - Saferwall Beta 1.0</title>
</svelte:head>

<Header {user} />
<main class="flex-1 flex flex-col py-4 h-full bg-background space-y-6">
	<ProfileHeading title="Settings" />
	<slot />
</main>
<Footer />
