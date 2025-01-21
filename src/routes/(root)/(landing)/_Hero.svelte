<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import Button from "$lib/components/form/Button.svelte";
	import { clamp } from "$lib/utils";
	import { navLinkSectionAction } from "$lib/utils/navLinkSectionAction";


</script>

<section
	id=""
	use:navLinkSectionAction
	class="flex justify-center"
	style="
		padding-top: {clamp(75, 125)};
		padding-bottom: {clamp(50, 60)};
	"
>
	<div class="container landing-container w-full flex flex-col justify-center items-center mx-landing"
		style="
			gap: {clamp(20, 35)};
		"
		>
		<div class="flex flex-col justify-center items-center gap-[clamp(13px,3vw,25px)] max-w-[758px]">
			<h1 class="font-semibold text-center text-[#DBDBDB]"
				style="
					font-size: {clamp(30, 53)};
					line-height: {clamp(38, 68)}
				"
			>
				Automated Malware Analysis 
				in 60 seconds, not hours&nbsp;!
			</h1>
			<h2 class="
					text-center 
					max-w-[616px] 
					text-[#969696] font-regular
					--text-[clamp(14px,3vw,16px)]
					--leading-[clamp(23px,5vw+1rem,25px)]
				"
				style="
					font-size: {clamp(15, 16)};
					line-height: {clamp(22, 25)};
				"
			>
				Saferwall speeds up malware analysis by handling repetitive sandboxing tasks,
				allowing analysts and researchers to focus on what really matters.
			</h2>
		</div>
		<Button
			theme="brand"
			class="border-none text-white rounded-[8px] font-semibold --leading-[25px]"
			style="
				padding-inline: {clamp(16, 22)};
				padding-block: {clamp(10, 12)};
				font-size: {clamp(14, 15)};
				line-height: {clamp(21, 25)};
			"
			href="/app"
			on:click={() => invalidateAll()}
			>
			Try for free
		</Button>
	</div>
</section>
