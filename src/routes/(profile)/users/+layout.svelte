<script lang="ts">
	import type { PageData } from './$types';

	import Footer from '$lib/components/partials/Footer.svelte';
	import Navbar from '$lib/components/partials/Navbar.svelte';
	import ProfileHeading from '$lib/components/partials/ProfileHeading.svelte';
	import ProfileCard from '$lib/components/cards/profile/ProfileCard.svelte';

	export let data: PageData;

	$: user = data.user;
	$: profile = data.profile;
	$: loggedIn = data.user !== undefined;
	$: selfProfile = data.user?.username === data.username;
</script>

<Navbar {user} />
<main class="flex-1 flex flex-col py-4 h-full bg-grayx space-y-6">
	<ProfileHeading />
	<ProfileCard {loggedIn} {...profile} {selfProfile} />
	<slot />
</main>
<Footer />
