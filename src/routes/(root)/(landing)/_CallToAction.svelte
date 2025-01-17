<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import Button from "$lib/components/form/Button.svelte";
import { clamp } from "$lib/utils";


</script>

<section class="flex flex-col items-center w-full"
	style="
		gap: {clamp(20, 25)};
		padding-block: {clamp(65, 70)};
		background: linear-gradient(180deg, #0D0D0D 0%, #151516 100%);
	">
	<h2 class="font-semibold text-center" style="font-size: {clamp(25, 40)}; line-height: {clamp(34, 52)};">
		Shaping the present.<br>
		Protecting the Future.
	</h2>
	<Button
		theme="brand"
		class="border-none text-white rounded-[8px] w-fit font-semibold --leading-[25px]"
		style="
			padding-inline: {clamp(16, 20)};
			padding-block: {clamp(10, 10)};
			font-size: {clamp(14, 15)};
			line-height: {clamp(21, 25)};
		"
		on:click={() => invalidateAll()}
		href="/app"
	>
		Try for free
	</Button>
</section>