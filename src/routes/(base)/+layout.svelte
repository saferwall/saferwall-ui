<script lang="ts">
	import Footer from '$lib/components/partials/Footer.svelte';
	import Navbar from '$lib/components/partials/Navbar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: user = data.user;
</script>

<Navbar {user} />
<main class="flex-1 flex flex-col h-full bg-grayx">
	<slot />
</main>
<Footer />
