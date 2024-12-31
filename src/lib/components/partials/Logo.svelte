<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import SvgLogo from "./SvgLogo.svelte";
	let Class = "";
	export { Class as class }
</script>

<a
	class={twMerge("text-dark dark:text-white inline-flex items-start justify-start flex-shrink-0 h-[26px]", Class)}
	href="/"
>
	<SvgLogo />
	<span class="sr-only">Saferwall</span>
</a>
