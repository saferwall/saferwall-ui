<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { cssClamp } from '$lib/utils';

	let data: {
		icon: string;
		title: string;
		text: string;
	}[] = [
		{
			icon: 'dots-circle',
			title: 'threat intelligence',
			text: 'Gain strategic insights to stay ahead of new malware threats.'
		},
		{
			icon: 'triangle-square-loop',
			title: 'Efficient analysis',
			text: 'Reduce mundane tasks and save your energy for the heavy lifting.'
		},
		{
			icon: 'update',
			title: 'Engine updates',
			text: 'We are continuously update our engine for a better experience.'
		},
		{
			icon: 'paper-target',
			title: 'Effective reporting',
			text: 'Get all necessary information to help you make the right decision.'
		}
	];
</script>

<section
	class="flex flex-col --items-center max-w-full w-full"
	style="padding-block: {cssClamp('40px', '80px')}; gap: {cssClamp('40px', '60px')}"
>
	<div class="container px-4 self-center">
		<div
			class="flex flex-col gap-[11px] lg:flex-row lg:justify-between lg:items-center lg:*:max-w-[460px]"
		>
			<h3
				class="--text-[28px] --lg:text-[42px] font-semibold text-[#DBDBDB]"
				style="font-size: {cssClamp('28px', '42px')}"
			>
				Designed for modern Cybersecurity
			</h3>
			<p
				class="--text-[14px] --lg:text-[15px] text-[#969696]"
				style="font-size: {cssClamp('14px', '15px')}"
			>
				Saferwall is designed to meet the demands of modern cybersecurity. With a focus on
				performance, precision, and adaptability, Saferwall helps analysts and researchers make
				informed decisions and strengthen their stance against emerging threats.
			</p>
		</div>
	</div>
	<div class="flex flex-col items-center overflow-x-scroll no-scroll-style max-w-full">
		<div
			class="container px-4 flex *:basis-0 *:flex-grow overflow-x-visible"
			style="gap: {cssClamp('16px', '23px')}"
		>
			{#each data as el}
				<div
					class="flex flex-col gap-[20px]  border border-[#1F1F20] min-w-[240px]"
					style="padding: 20px; padding-block: {cssClamp('20px', '26px')}; border-radius: {cssClamp("20px", "30px")}"
				>
					<Icon name={el.icon} class="size-[40px]"></Icon>
					<div class="flex flex-col" style="gap: {cssClamp('5px', '10px')}">
						<h4 class="capitalize text-[16px] font-semibold text-[#DBDBDB]">{el.title}</h4>
						<p class="text-[#969696] text-[14px]">{el.text}</p>
					</div>
				</div>
			{/each}
			<div class="w-4 min-w-4 flex-grow-0 max-w-4"></div>
		</div>
	</div>
</section>
