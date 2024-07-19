<script lang="ts">
	import Footer from '$lib/components/partials/Footer.svelte';
	import Navbar from '$lib/components/partials/Navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: user = data.user;
</script>

<Navbar {user} />
<main class="flex-1 flex flex-col h-full bg-neutral">
	<slot />
</main>
<Footer />
