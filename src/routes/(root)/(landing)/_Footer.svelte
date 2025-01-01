<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Logo from '$lib/components/partials/Logo.svelte';
	import { clamp } from '$lib/utils';

	let data = [
		{
			title: "Product",
			items: [
				{
					text: "Highlights",
					href: "/#highlights",
				},
				{
					text: "Features",
					href: "/#features",
				}
			]
		},
		{
			title: "Developers",
			items: [
				{
					text: "API",
					href: "https://docs.saferwall.com/docs/category/webapi/",
				},
				{
					text: "Github",
					href: "https://github.com/saferwall/",
				},
				{
					text: "Docs",
					href: "https://docs.saferwall.com/",
				}
			]
		},
		{
			title: "Resources",
			items: [
				{
					text: "Blog",
					href: "https://docs.saferwall.com/blog",
				},
				{
					text: "Contact",
					href: "/contact",
				}
			]
		},
		{
			title: "Legal",
			items: [
				{
					text: "Privacy Policy",
					href: "/pages/privacy-policy",
				},
				{
					text: "Terms of use",
					href: "/pages/terms-of-service",
				}
			]
		},
	]
</script>

<footer class="px-4 flex justify-center w-full" style="padding-block: {clamp(40, 70)}">
	<div class="flex container bg-[#0D0D0D] flex-col lg:flex-row justify-between gap-[44px]">
		<div class="flex flex-row items-center lg:flex-col lg:items-start justify-between grow-[1] gap-[28px]">
			<div class="flex flex-col gap-[14px]">
				<Logo />
				<p class="text-[#969696] lg:block hidden">A hackable malware sandbox for the 21st Century.</p>
			</div>
			<div class="flex text-[#969696]" style="gap: {clamp(20, 23)}">
				<a href="https://github.com/saferwall/">
					<Icon name="github-logo" class="size-[17px]"></Icon>
				</a>
				<a href="https://www.linkedin.com/company/saferwall/">
					<Icon name="linkedin-logo" class="size-[17px]"></Icon>
				</a>
				<a href="https://x.com/Saferwall">
					<Icon name="x-logo" class="size-[17px]"></Icon>
				</a>
			</div>
		</div>
		<div class="flex grow-[2] flex-wrap max-[454px]:*:min-w-[120px] gap-[16px] *:mb-[14px]">
			{#each data as el}
				<div class="flex flex-col grow basis-0 gap-[15px]">
					<h5 class="font-medium">{el.title}</h5>
					<ul class="flex flex-col gap-[10px]">
						{#each el.items as {text, href}}
							<li class="text-[#969696]">
								<a {href}>
									{text}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</footer>
