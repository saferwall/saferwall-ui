<script lang="ts">
	import type { LayoutData } from './$types';

	import Footer from '$lib/components/partials/Footer.svelte';
	import Navbar from '$lib/components/partials/Navbar.svelte';
	import ProfileHeading from '$lib/components/partials/ProfileHeading.svelte';

	export let data: LayoutData;

	$: user = data.user!;
</script>

<svelte:head>
	<title>Account Settings - Saferwall</title>
</svelte:head>

<Navbar {user} />
<main class="flex-1 flex flex-col py-4 h-full bg-neutral space-y-6">
	<ProfileHeading title="Settings" />
	<slot />
</main>
<Footer />
