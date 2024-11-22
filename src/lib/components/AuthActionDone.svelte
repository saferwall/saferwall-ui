<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let title = '';
	export let image = 'image-email-sent';
	export let imageClass = 'w-36 h-36';
	export let textClass = "";
	let Class = "";
	export { Class as class };
</script>

<div class={twMerge("px-[40px] py-[35px] flex flex-col items-center gap-4 w-full max-w-[450px]", Class)}>
	<svg class={imageClass}>
		<use href="/images/icons.svg#{image}" />
	</svg>
	<div class={twMerge("flex flex-col items-center gap-2", textClass)}>
		<h1 class="text-lg font-bold">{title}</h1>
		<slot />
	</div>
</div>
