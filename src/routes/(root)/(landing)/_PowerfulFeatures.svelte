<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { clamp, cssClamp } from '$lib/utils';

	let data: {
		icon: string;
		title: string;
		text: string;
	}[] = [
		{
			icon: 'target-bug',
			title: 'Evasive Detection',
			text: 'Saferwall Sandbox runs malware in a real environment, providing better detection of evasive threats than virtual machines.'
		},
		{
			icon: 'semi-valve-logo',
			title: 'IOC Extraction',
			text: 'IOCs are extracted to track past attacks, prevent future threats, and simplify malware investigation and triage'
		},
		{
			icon: 'api-cpu',
			title: 'API integration',
			text: 'Script complex actions via the API, allowing seamless implementation of all well-known functionalities.'
		},
		{
			icon: 'scale-up',
			title: 'Scaled Analysis',
			text: 'Saferwall is designed for scalability, efficiently scanning large volumes of samples to tackle emerging threats daily.'
		},
		{
			icon: 'package-toolbox',
			title: 'Automated Unpacking',
			text: 'Dynamic analysis enables unpacking and advanced insights, identifying new malware families with ongoing updates.'
		},
		{
			icon: 'string-search',
			title: 'Advanced Search',
			text: 'Look up file hashes, domains, behaviors, and IOCs in seconds for fast, actionable results.'
		},
	];
</script>

<section
	id="features"
	class="flex justify-center scroll-mt-[73px]"
	style="
		padding-top: {clamp(40, 80)};
		padding-bottom: {clamp(40, 114)};
	"
>
	<div class="flex flex-col items-center max-w-full w-full "
			style="
				gap: {cssClamp('40px', '60px')}
			">
		<div class="flex justify-center">
			<div class="container landing-container mx-landing self-center">
				<div
					class="flex flex-col gap-[11px] lg:flex-row lg:justify-between --lg:items-center"
				>
					<h3
						class="font-semibold text-[#DBDBDB] lg:max-w-[368px]"
						style="
							font-size: {cssClamp('28px', '42px')};
							line-height: {cssClamp("36px", "50px")};
						"
					>
						Powerful features with all plans
					</h3>
					<p
						class="text-[#969696] lg:max-w-[calc(min(50%,560px))]"
						style="
							font-size: 15px /* {cssClamp('15px', '15px')} */;
							line-height: {cssClamp("22px", "27px")};
						"
					>
						We help analysts and researchers focus more on in-depth analysis and threat inteligence
						ultimately leading to quicker detection and response to emerging threats.
					</p>
				</div>
			</div>
		</div>
		<div class="flex justify-center overflow-x-scroll w-full no-scroll-style max-w-full">
			<div
				class="min-w-0 container landing-container mx-landing flex *:basis-0 *:flex-grow overflow-x-visible lg:flex-wrap"
				style="gap: {cssClamp('16px', '23px')}"
			>
				{#each data as el}
					<div
						class="flex flex-col gap-[20px] border border-[#1F1F20] min-w-[242px] lg:min-w-[368px]"
						style="padding-inline: {cssClamp('20px', '35px', [ 1024, 1152 ])}; padding-block: {cssClamp('20px', '28px', [ 1024, 1152 ])}; border-radius: {cssClamp('20px', '25px', [ 1024, 1152 ])}"
					>
						<Icon name={el.icon} class="size-[48px]"></Icon>
						<div class="flex flex-col" style="gap: {cssClamp('5px', '10px')}">
							<h4 class="capitalize --text-[16px] font-semibold text-[#DBDBDB]"
								style="font-size: {clamp(15, 16)}; line-height: {clamp(22, 25)};">
								{el.title}
							</h4>
							<p class="text-[#969696] --text-[14px]"
								style="font-size: {clamp(14, 15)}; line-height: {clamp(21, 25)};">
								{el.text}
							</p>
						</div>
					</div>
				{/each}
				<div class="lg:hidden w-4 min-w-4 flex-grow-0 max-w-4"></div>
			</div>
		</div>
	</div>
</section>
