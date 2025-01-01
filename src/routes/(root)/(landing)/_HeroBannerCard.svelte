<script lang="ts">
	import { twMerge } from "tailwind-merge";

	let Class = "";
	export let style = "";
	export { Class as class }
	export let before = false;
	export let margins = ""
</script>

<div class="w-0">
	<div class={twMerge((!before ? "bg-[#181819] border border-[#262528] " : "") + "rounded-lg p-4 min-w-max", Class, "top-0 left-0", margins)} {style} class:herocardbefore={before}>
		<slot></slot>
	</div>
</div>

<style lang="postcss">
	.herocardbefore {
		& {
			position: relative;
		}
		&::before {
			@apply [content:''] absolute z-0 top-0 bottom-0 left-0 right-0 block border border-transparent rounded-[inherit];
			background-image: linear-gradient(90deg, #181819 var(--bg-start, 0%), #0D0D0D var(--bg-end, 100%)), linear-gradient(90deg, #262528 var(--border-start, 0%), #0D0D0D var(--border-end, 100%));
			background-clip: padding-box,border-box;
			background-origin: border-box;
		}
		:global(> *) {
			@apply relative z-10;
		}
	}
</style>