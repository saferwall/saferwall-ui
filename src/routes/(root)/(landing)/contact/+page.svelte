<script lang="ts">
	import { goto } from "$app/navigation";
	import { env } from "$env/dynamic/public";
	import Button from "$lib/components/form/Button.svelte";
	import Input from "$lib/components/form/Input.svelte";
	import { cssClamp } from "$lib/utils";
	import axios, { AxiosError } from "axios";

	const maxWidth = 560;
	const clamp = (min: number, max: number) => cssClamp(min +  "px", max + "px", [360, maxWidth])

	type Token = string

	let loading = false;

	function onClick() {
		loading = true;
		// @ts-ignore
		let captcha: { ready: (callback: () => void) => void, execute: (site_key: string, options: { action: "submit" }) => Promise<Token> } = grecaptcha;
		captcha.ready(() => {
			captcha.execute("6LfcurUqAAAAAOc5jCpNPLryEnzhpz91AAu3UOHC", { action: "submit" }).then((token) => {
				axios.postForm(new URL("/contact/", env.PUBLIC_API_URL).href, {
					subject, email, message,
					"g-recaptcha-response": token,
				})
				.then(() => {
					goto("/contact/sent");
				}).catch((e: AxiosError) => {
					console.log({e});
					alert("An error occured: " + JSON.stringify(e.response?.data));
				})
				.finally(() => {
					loading = false;
				})
			})
		})
	}

	let subject = "", email = "", message = "";
</script>

<section class="flex justify-center" style="padding-top: {clamp(80, 90)}; padding-bottom: {clamp(50, 90)};">
	<div class="container landing-container mx-landing [&.container.container.container]:min-[564px]:max-w-[564px]">
		<div class="flex flex-col gap-[40px] ">
	
			<div class="flex flex-col items-center *:text-center" style="gap: {clamp(13, 15)}">
				<h1 class="font-semibold" style="font-size: {clamp(28, 45)}">How can we help?</h1>
				<h2 class="text-[#969696]" style="font-size: {clamp(14, 16)}">Get in touch for demos, onboarding support, or product questions.</h2>
			</div>
	
			<form action="" class="flex flex-col gap-[12px] w-full *:w-full text-[14px]">
				<Input class="px-3 border-[#292929]" labelClass="left-3 translate-y-[-11px] text-[#5F5F5F]" label="Email" bind:value={email} />
				<Input class="px-3 border-[#292929]" labelClass="left-3 translate-y-[-11px] text-[#5F5F5F]" label="Subject" bind:value={subject} />
				<Input class="px-3 border-[#292929] resize-none min-h-[168px] placeholder:text-[#5F5F5F]" labelClass="left-3" placeholder="Your message..." multiline bind:value={message}/>
				<div class="flex justify-between items-center md:flex-row flex-col-reverse gap-[21px]">
					<p class="text-[#969696] text-center md:text-left">You can also email us at <a class="text-[#DBDBDB]" href="mailto:support@saferwall.com">support@saferwall.com</a></p>
					<Button theme="brand" class="border-none text-white font-semibold leading-[25px] px-8 rounded-[10px] md:w-fit w-full"
						on:click={onClick} {loading}
						>Send</Button>
				</div>
			</form>
	
		</div>
	</div>
</section>