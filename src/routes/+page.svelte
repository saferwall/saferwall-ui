<script lang="ts">
	import AdvancedUnpacking from './_AdvancedUnpacking.svelte';
import AutomatedSandboxing from './_AutomatedSandboxing.svelte';
	import CallToAction from './_CallToAction.svelte';
import Description from './_Description.svelte';
	import Footer from './_Footer.svelte';
import Hero from './_Hero.svelte';
	import HeroBanner from './_HeroBanner.svelte';
	import MultiAvScan from './_MultiAvScan.svelte';
	import Navbar from './_Navbar.svelte';
	import PowerfulFeatures from './_PowerfulFeatures.svelte';
	import StreamlineAnalysis from './_StreamlineAnalysis.svelte';
</script>

<main class="flex flex-col items-center bg-[#0D0D0D] min-h-[100vh]">
	<Navbar />
	<Hero />
	<HeroBanner />
	<Description />
	<AutomatedSandboxing />
	<MultiAvScan />
	<StreamlineAnalysis />
	<AdvancedUnpacking />
	<PowerfulFeatures />
	<CallToAction />
	<Footer />
</main>
