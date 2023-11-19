<script>
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	onMount(() => {
		if (browser) {
			document.querySelector('body')?.classList.add('overlay-no-scroll');
		}
	});

	onDestroy(() => {
		if (browser) {
			document.querySelector('body')?.classList.remove('overlay-no-scroll');
		}
	});
</script>

<div
	on:mouseup
	transition:fade={{ duration: 200 }}
	class="fixed z-40 top-0 left-0 w-full h-full bg-gray-600/30"
/>
<slot />
