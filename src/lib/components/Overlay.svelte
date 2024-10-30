<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	onMount(() => {
		document.body?.classList.add('overlay-no-scroll');

		return () => {
			document.body?.classList.remove('overlay-no-scroll');
		};
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click
	transition:fade={{ duration: 200 }}
	class="fixed z-40 top-0 left-0 w-full h-full bg-black/60"
/>
<slot />
