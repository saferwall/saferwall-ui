<script lang="ts">
	import Footer from '$lib/components/partials/Footer.svelte';
	import Header from '$lib/components/navigation/Header.svelte';
	import type { LayoutData } from './$types';
	import { setContext } from 'svelte';

	export let data: LayoutData;

	let { strip } = data;

	setContext("strip", strip);

	$: user = data.user;
	$: session = data.session;
</script>

{#if !strip}
	<Header {user} {session}/>
{/if}
<main class="flex-1 flex flex-col h-full text-primary-text">
	<slot />
</main>
{#if !strip}
	<Footer />
{/if}