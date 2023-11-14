<script lang="ts">
	import Footer from '$lib/components/partials/Footer.svelte';
	import Navbar from '$lib/components/partials/Navbar.svelte';
	import ProfileHeading from '$lib/components/partials/ProfileHeading.svelte';
	import ProfileCard from '$lib/components/cards/profile/ProfileCard.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: user = data.user;
	$: profile = data.profile;
	$: loggedIn = data.user !== undefined;
	$: selfProfile = data.user?.username === data.username;
	$: followed = data.profile.followers?.includes(data.user?.username!);
</script>

<svelte:head>
	<title>{profile.username} Profile - Saferwall</title>
</svelte:head>
<Navbar {user} />
<main class="flex-1 flex flex-col py-4 h-full bg-neutral space-y-6">
	<ProfileHeading />
	<ProfileCard {loggedIn} {...profile} {selfProfile} {followed} />
	<slot />
</main>
<Footer />
