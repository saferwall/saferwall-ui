<script lang="ts">
	import type { PageData } from './$types';
	import App from './_App.svelte';
	import LandingPage from './_LandingPage.svelte';

	export let data: PageData;

	$: gotoApp = data.gotoApp;
</script>

{#if gotoApp}
	<App {data}></App>
{:else}
	<LandingPage></LandingPage>
{/if}


