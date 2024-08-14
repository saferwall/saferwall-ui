<script lang="ts">
	import type { Saferwall } from '$lib/types';

	import type { SaferwallClient } from '$lib/clients/saferwall';
	import Expandable from '$lib/components/Expandable.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Label from '$lib/components/form/Label.svelte';
	import ProcessTable from './ProcessTable.svelte';

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
	$: console.log({trees});
</script>

<ul class={`flex flex-col divide-y  ${isChild ? 'border-t mt-6' : ''}`}>
	{#each trees as tree, index (tree.path)}
		<li class="pr-4" class:pl-12={tree.parent_pid === '0x0'} class:ml-12={tree.parent_pid !== '0x0'}>
			<Expandable expandable={tree.children.length != 0}>
				<svelte:fragment slot="header">
					<div class="flex flex-col gap-2 w-full">
						<div class="flex items-center gap-2">
							<h2 class="flex flex-row items-center font-medium">
								<span>
									{tree.pid}
								</span>
								<span class="dot" />
								<span>
									{tree.proc_name}
								</span>
							</h2>
							<Label class="uppercase rounded-full px-3">
								{tree.file_type}
							</Label>

							{#if tree.detection !== ""}
								<Label
									theme={tree.detection === 'clean'
										? 'brand'
										: tree.detection === 'malicious'
											? 'danger'
											: 'base'}
								>
									{tree.detection}
								</Label>
							{/if}
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							on:click|stopPropagation={() => onFilePathClick(index)}
							class="flex space-x-2 border-zinc-700 dark:border-zinc-300 items-center text-neutral-300 transition-all"
							class:text-primary={processTableOpen.includes(index)}
						>
							<Icon
								name={processTableOpen.includes(index) ? 'minus-circle' : 'plus-circle'}
								size="w-5 h-5 text-primary"
							/>
							<p class="text-zinc-600 dark:text-zinc-400 text-xs">{tree.path} »</p>
						</div>
						{#if processTableOpen.includes(index)}
							<ProcessTable {behaviorId} {client} pid={tree.pid} />
						{/if}
					</div>
				</svelte:fragment>
				<svelte:fragment slot="expanded">
					<svelte:self trees={tree.children} {behaviorId} pid={tree.pid} />
				</svelte:fragment>
			</Expandable>
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		@apply dark:border-zinc-600 border-zinc-300;
		li {
			@apply cursor-pointer py-6 dark:border-zinc-600 border-zinc-300;
		}

		.dot {
			@apply block w-1 h-1 rounded-full bg-current mx-1;
		}
	}
</style>
