<script lang="ts">
	import Button from "$lib/components/form/Button.svelte";
	import { clamp, cssClamp } from "$lib/utils";


</script>

<section class="container flex flex-col justify-center items-center gap-[clamp(20px,3vw,35px)] min-h-[calc(100vh-71px*2)]">
	<div class="flex flex-col justify-center items-center gap-[clamp(13px,3vw,25px)] max-w-[758px]">
		<h1 class="text-[clamp(28px,3vw+1rem,53px)] leading-[clamp(34px,5vw+1rem,68px)] font-semibold text-center text-[#DBDBDB]">
			Automated Malware Analysis 
			in 60 seconds, not hours !
		</h1>
		<h2 class="
			text-center 
			text-[clamp(14px,3vw,16px)] leading-[clamp(23px,5vw+1rem,25px)]
			max-w-[616px] 
			text-[#969696] font-regular
			">
			Saferwall speeds up malware analysis by handling repetitive sandboxing tasks,
			allowing analysts and researchers to focus on what really matters.
		</h2>
	</div>
	<Button
		class="border-none text-white bg-[#5F4CD9] rounded-[8px] font-semibold leading-[25px]"
		style="
			padding-inline: {clamp(16, 22)};
			padding-block: {clamp(8, 12)};
		"
		>
		Try for free
	</Button>
</section>
