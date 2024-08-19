<script lang="ts">
	import { twMerge } from "tailwind-merge";

	let Class = ""
	export { Class as class };
	export let circleClass = "";
	export let textClass = "";
	export let scoreClass = "";
	export let totalClass = "";
	export let trackCircleClass = "";
	export let progressCircleClass = "";
	export let score: number | undefined = undefined;
	export let total: number | undefined = undefined;

	export let size = 100;
	export let strokeWidth = 5;

	$: radius = (size - strokeWidth) / 2;
	$: circumfrence = Math.PI * 2 * radius;

	$: noScore = score === undefined || total === undefined;
	$: progress = (score ?? 0) / (total ?? 1);
</script>

<svg width="{size}" height="{size}" viewBox="0 0 {size + 0} {size + 0}" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<circle class={twMerge("stroke-zinc-400", Class, circleClass, trackCircleClass)} r={radius} cx={size / 2} cy={size / 2} stroke-width={strokeWidth} stroke-dasharray={circumfrence} fill="transparent" stroke-dashoffset="0"></circle>
	<circle class={twMerge("stroke-green-500", Class, circleClass, progressCircleClass)} r={radius} cx={size / 2} cy={size / 2} stroke-width={strokeWidth} stroke-linecap="round" stroke-dasharray={circumfrence} fill="transparent" stroke-dashoffset="{circumfrence * (1 - progress)}px" style="transform:rotate(180deg); transform-origin: center; transform-box: fill-box;"></circle>
	<text class={twMerge("fill-green-500", Class, textClass, scoreClass)} x="50%" y="50%" dy="-0.6lh" dominant-baseline="middle" text-anchor="middle">{!noScore ? score : "N/A"}</text>
	<text class={twMerge("fill-green-500", Class, textClass, totalClass)} x="50%" y="50%" dy="+0.6lh" dominant-baseline="middle" text-anchor="middle">{"/ " + (!noScore ? total: " -")}</text>
</svg>