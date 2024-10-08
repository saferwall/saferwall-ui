<script lang="ts">
	import type { Saferwall } from '$lib/types';

	import type { SaferwallClient } from '$lib/clients/saferwall';
	import Expandable from '$lib/components/Expandable.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Label from '$lib/components/form/Label.svelte';
	import ProcessTable from './ProcessTable.svelte';
	import { twMerge } from 'tailwind-merge';

	export let behaviorId: string;
	export let client: SaferwallClient;

	export let isChild = true;
	export let trees: Saferwall.Behaviors.NestedProcessTree[];

	let processTableOpen: number[] = [];
	const onFilePathClick = (index: number) => {
		processTableOpen = processTableOpen.includes(index)
			? processTableOpen.filter((i) => i !== index)
			: [...processTableOpen, index];
	};
</script>

{#if !trees.length && !isChild}
<div class="text-secondary-text text-center pb-4">No Process Tree available.</div>
{:else if trees.length}
<ul class="flex flex-col divide-y divide-line-surface {isChild && trees.length ? "border-t border-line-surface " : "pl-12"}">
	{#each trees as tree, index (tree.path)}
		<li class="pr-4" class:pl-4={tree.parent_pid !== '0x0'}>
			<Expandable expandable={true}>
				<!-- /* tree.children.length != 0 */ -->
				<svelte:fragment slot="header">
					<div class="flex flex-col gap-2 w-full py-3">
						<div class="flex items-center gap-2">
							<h2 class="flex gap-1 items-center font-medium">
								<span>
									0x<span class="uppercase">
										{tree.pid.replace("0x", "")}
									</span>
								</span>
								<span class="dot" />
								<span>
									{tree.proc_name}
								</span>
							</h2>
							<Label class="uppercase rounded-sm px-[11px] py-[4px] {twMerge("bg-[#498B5A]/10 text-[#498B5A]", tree.file_type === "exe" ? "bg-blue-600/10 text-blue-600" : "")}">
								{tree.file_type}
							</Label>

							{#if tree.detection !== ""}
								<Label class="capitalize {tree.detection === "malicious" ? "text-alert-red bg-[#ED4060]/10" : (tree.detection === "clean" ? "text-[#498B5A] bg-[#498B5A]/10" : "")}">
									<div class="flex gap-1 items-center capitalize">
										{#if tree.detection !== "unknown"}
											<Icon class="size-4 flex flex-col items-center justify-center {tree.detection === "malicious" ? "-translate-y-[1px]" : ""}" name={tree.detection === "malicious" ? "unsafe" : (tree.detection === "clean" ? "info" : "")}></Icon>
										{/if}
										<span class="capitalize">
											{tree.detection}
										</span>
									</div>
								</Label>
							{/if}
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						 <!-- {#if tree.parent_pid !== "0x0"}
						 	test
							 <div
								 on:click|stopPropagation={() => onFilePathClick(index)}
								 class="flex space-x-2 border-zinc-700 dark:border-zinc-300 items-center text-neutral-300 transition-all"
								 class:text-primary={processTableOpen.includes(index)}
							 >
								 <div class="text-neutral-400 border border-brand rounded-full transition-transform {processTableOpen.includes(index) ? 'bg-brand-surface' : '-rotate-90 text-brand'} w-5 h-5 flex justify-center items-center">
									 <Icon name="arrow-down" size="w-2.5 h-2.5" class="translate-y-[1px] translate-x-[-0.5px] transition-colors {processTableOpen.includes(index) ? 'text-white' : 'text-brand'}" />
								 </div>
								 <p class="text-zinc-600 dark:text-zinc-400 text-xs">{tree.path} »</p>
							 </div>
							 {#if processTableOpen.includes(index)}
								 <ProcessTable {behaviorId} {client} pid={tree.pid} />
							 {/if}
						 {/if} -->
					</div>
				</svelte:fragment>
				<svelte:fragment slot="expanded">
					<div class="flex flex-col pl-8">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							on:click|stopPropagation={() => onFilePathClick(index)}
							class="cursor-pointer flex gap-[12px] pt-0.5 pb-3 border-zinc-700 dark:border-zinc-300 items-center transition-all"
							class:text-primary={processTableOpen.includes(index)}
						>
							<div class="text-neutral-400 border border-brand rounded-full transition-transform {processTableOpen.includes(index) ? 'bg-brand-surface' : '-rotate-90 text-brand'} w-5 h-5 flex justify-center items-center">
								<Icon name="arrow-down" size="w-2.5 h-2.5" class="translate-y-[1px] translate-x-[-0.5px] transition-colors {processTableOpen.includes(index) ? 'text-white' : 'text-brand'}" />
							</div>
							<p class="select-none transition-colors text-xs {processTableOpen.includes(index) ? "text-brand-text" : "text-table-res-text"}">{tree.path} »</p>
						</div>
						{#if processTableOpen.includes(index)}
							<ProcessTable {behaviorId} {client} pid={tree.pid} />
						{/if}
						<svelte:self trees={tree.children} {behaviorId} {client} />
					</div>
				</svelte:fragment>
			</Expandable>
		</li>
	{/each}
</ul>
{/if}

<style lang="postcss">
	ul {
		@apply dark:border-zinc-600 border-zinc-300;
		li {
			@apply  py-0 dark:border-zinc-600 border-zinc-300;
		}

		.dot {
			@apply block w-1 h-1 rounded-full bg-crcl-surface mx-1;
		}
	}
</style>
