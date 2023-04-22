<script lang="ts">
	import Footer from '$lib/components/partials/Footer.svelte';
	import Navbar from '$lib/components/partials/Navbar.svelte';

	export let data: PageData;
	$: user = data.user;
</script>

<Navbar {user} />
<slot />
<Footer />
