<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Overlay from './Overlay.svelte';
	import { draw, fly, slide } from 'svelte/transition';
	import { cubicOut, quintInOut, quintOut } from 'svelte/easing';
	import Icon from './Icon.svelte';

	export let closeButton = true;
	export let open: boolean = false;
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'xl';

	const dispatch = createEventDispatcher();

	function closeDrawer(event: Event | MouseEvent | KeyboardEvent) {
		if (event instanceof KeyboardEvent) {
			if (event.key !== 'Escape') {
				return;
			}
		}

		dispatch('close');
		open = false;
	}
</script>

{#if open}
	<Overlay on:mouseup={closeDrawer}>
		<div
			transition:fly={{ duration: 300, easing: quintInOut, x: '100%' }}
			class={`drawer fixed top-0 right-0 h-full w-full bg-white z-50 drawer--${size}`}
		>
			{#if closeButton}
				<!-- Drawer content goes here -->
				<button
					class="absolute top-4 left-4 flex items-center justify-center rounded-full w-8 h-8"
					on:click={closeDrawer}
				>
					<Icon name="close" />
				</button>
			{/if}
			<slot />
		</div>
	</Overlay>
{/if}

<svelte:window on:keyup={closeDrawer} />

<style lang="postcss">
	.drawer {
		&--xl {
			@apply max-w-screen-xl;
		}
		&--lg {
			@apply max-w-screen-lg;
		}
		&--md {
			@apply max-w-screen-md;
		}
		&--sm {
			@apply max-w-screen-sm;
		}
	}
</style>
