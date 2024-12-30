<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from '../(landing)/$types';
	import CallToAction from './_CallToAction.svelte';
	import Footer from './_Footer.svelte';
	import Navbar from './_Navbar.svelte';
	export let data: LayoutData;

	$: user = data.user;
	$: session = data.session;

	onMount(() => {
		document.documentElement.classList.add("landing");
		return () => document.documentElement.classList.remove("landing");
	})
</script>

<main class="flex flex-col items-center text-[#E8E8E8] min-h-[100vh]">
	<Navbar />
	<slot></slot>
	<CallToAction />
	<Footer />
</main>

<style lang="postcss">
	:global(html.landing, html.landing body) {
		@apply bg-[#0D0D0D];
	}
</style>
