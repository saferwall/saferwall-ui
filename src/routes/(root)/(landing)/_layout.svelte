<script lang="ts">
	import Navbar from './_Navbar.svelte';
	import CallToAction from './_CallToAction.svelte';
	import Footer from './_Footer.svelte';

	let menuOpen = false;
</script>

{@html `<${""}style>html, body { background-color: #0D0D0D; scroll-behavior: smooth; }</style>`}

<main class="relative flex flex-col items-center text-[#E8E8E8] min-h-[100vh]">
	<Navbar />
	<div class="w-full relative z-10 flex flex-col items-center">
		<slot></slot>
	</div>
	<CallToAction />
	<Footer />
</main>
