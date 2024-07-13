<script lang="ts">
	import Footer from '$lib/components/partials/Footer.svelte';
	import Header from '$lib/components/navigation/Header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: user = data.user;
</script>

<Header {user} />
<slot />
<Footer />
