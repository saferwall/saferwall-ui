<script>
	import '../app.css';

	import Footer from '$lib/components/partials/Footer.svelte';
	import Navbar from '$lib/components/partials/Navbar.svelte';
</script>

<Navbar />
<main class="flex-1 flex flex-col h-full bg-grayx">
	<slot />
</main>
<Footer />
