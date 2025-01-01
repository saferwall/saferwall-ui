<script lang="ts">
	import Header from "$lib/components/navigation/Header.svelte";
	import Footer from "$lib/components/partials/Footer.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;

	$: user = data.user;
</script>

<Header {user} />
<main class="flex-1 flex flex-col h-full dark:text-white">
	<slot />
</main>
<Footer />
