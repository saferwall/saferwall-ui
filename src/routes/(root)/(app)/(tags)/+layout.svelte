<script lang="ts">
	import Footer from '$lib/components/partials/Footer.svelte';
	import Header from '$lib/components/navigation/Header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: user = data.user;
	$: session = data.session;
</script>

<Header {user} {session}/>
<main class="flex-1 flex flex-col h-full text-primary-text">
	<slot />
</main>
<Footer />