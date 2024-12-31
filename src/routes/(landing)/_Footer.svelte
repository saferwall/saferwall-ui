<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Logo from '$lib/components/partials/Logo.svelte';
	import { clamp } from '$lib/utils';

	let data = [
		["Product", "Highlights", "Features"],
		["Developers", "API", "Github", "Docs"],
		["Resources", "Blog", "Contact"],
		["Legal", "Privacy Policy", "Terms of use"],
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
				<Icon name="github-logo" class="size-[17px]"></Icon>
				<Icon name="linkedin-logo" class="size-[17px]"></Icon>
				<Icon name="x-logo" class="size-[17px]"></Icon>
			</div>
		</div>
		<div class="flex grow-[2] flex-wrap max-[454px]:*:min-w-[120px] gap-[16px] *:mb-[14px]">
			{#each data as el}
				<div class="flex flex-col grow basis-0 gap-[15px]">
					<h5 class="font-medium">{el[0]}</h5>
					<ul class="flex flex-col gap-[10px]">
						{#each el.slice(1) as text}
							<li class="text-[#969696]">
								<a href="about:blank">
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
