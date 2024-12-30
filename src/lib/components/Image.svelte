<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let name: string;
	export let size = 'w-6 h-6';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg on:click class={twMerge("image", size, $$props.class, $$restProps.class)}>
	<use href="/images/icons.svg#image-{name}" />
</svg>
