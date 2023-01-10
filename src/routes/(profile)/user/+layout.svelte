<script lang="ts">
	import type { PageData } from '../$types';
	import Footer from '$lib/components/partials/Footer.svelte';
	import Navbar from '$lib/components/partials/Navbar.svelte';
	import ProfileHeading from '$lib/components/partials/ProfileHeading.svelte';
	import ProfileCard from '$lib/components/ProfileCard.svelte';

	export let data: PageData;

	const { username } = data;
</script>

<Navbar />
<main class="flex-1 flex flex-col h-full bg-grayx">
	<ProfileHeading />
	<ProfileCard {username} />
	<slot />
</main>
<Footer />
