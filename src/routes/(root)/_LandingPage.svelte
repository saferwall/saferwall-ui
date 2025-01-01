<script lang="ts">
	import AdvancedUnpacking from './(landing)/_AdvancedUnpacking.svelte';
	import AutomatedSandboxing from './(landing)/_AutomatedSandboxing.svelte';
	import Description from './(landing)/_Description.svelte';
	import Hero from './(landing)/_Hero.svelte';
	import HeroBanner from './(landing)/_HeroBanner.svelte';
	import Layout from './(landing)/_layout.svelte';
	import MultiAvScan from './(landing)/_MultiAvScan.svelte';
	import PowerfulFeatures from './(landing)/_PowerfulFeatures.svelte';
	import StreamlineAnalysis from './(landing)/_StreamlineAnalysis.svelte';
</script>

<Layout>
	<Hero />
	<HeroBanner />
	<Description />
	<AutomatedSandboxing />
	<MultiAvScan />
	<StreamlineAnalysis />
	<AdvancedUnpacking />
	<PowerfulFeatures />
</Layout>
