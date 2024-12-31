<script lang="ts">
	import CallToAction from './_CallToAction.svelte';
	import Footer from './_Footer.svelte';
	import Navbar from './_Navbar.svelte';
</script>

{@html `<${""}style>html, body { background-color: #0D0D0D; }</style>`}

<main class="flex flex-col items-center text-[#E8E8E8] min-h-[100vh]">
	<Navbar />
	<slot></slot>
	<CallToAction />
	<Footer />
</main>
