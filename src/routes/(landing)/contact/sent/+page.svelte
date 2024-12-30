<script lang="ts">
	import AuthActionDone from "$lib/components/AuthActionDone.svelte";
	import Image from "$lib/components/Image.svelte";
	import { clamp } from "$lib/utils";


</script>

<section class="container flex flex-col items-center gap-[12px]" style="padding-top: {clamp(80, 80)}; padding-bottom: {clamp(50, 80)}">
	<Image name="circle-check" class="size-20"></Image>
	<h1 class="font-semibold text-[18px]">Message Sent !</h1>
	<p class="text-center text-[#969696] text-[15px] max-w-[370px]">Your message has been successfully sent. We will get back to you as soon as possible !</p>
</section>