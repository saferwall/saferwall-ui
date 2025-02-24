<script lang="ts">
	import ProfileCard from '$lib/components/cards/profile/ProfileCard.svelte';
	import Header from '$lib/components/navigation/Header.svelte';
	import Footer from '$lib/components/partials/Footer.svelte';
	import ProfileHeading from '$lib/components/partials/ProfileHeading.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: user = data.user;
	$: session = data.session;
	$: profile = data.profile;
	$: loggedIn = data.user !== undefined;
	$: selfProfile = data.user?.username === data.username;
	$: followed = data.profile.followers?.filter((el) => el.username == data.user?.username).length !== 0;
</script>

<svelte:head>
	<title>{profile.username} Profile - Saferwall 1.0</title>
</svelte:head>
<Header {user} {session}/>
<main class="flex-1 flex flex-col py-4 h-full bg-background space-y-6">
	<ProfileHeading />
	<ProfileCard {loggedIn} {...profile} {selfProfile} {followed} />
	<slot />
</main>
<Footer />
