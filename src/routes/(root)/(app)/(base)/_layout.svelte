<script lang="ts">
	import Header from "$lib/components/navigation/Header.svelte";
	import Footer from "$lib/components/partials/Footer.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;

	$: user = data.user;
	$: session = data.session;
</script>

<div class="relative flex flex-col items-stretch grow">
	<Header {user} {session} />
	<main class="flex-1 flex flex-col text-primary-text grow">
		<slot />
	</main>
	<Footer />
</div>
