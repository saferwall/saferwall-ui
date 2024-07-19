<!-- svelte-ignore a11y-click-events-have-key-events -->
<script lang="ts">
	import type { Saferwall } from '$lib/types';

	import Expandable from '$lib/components/Expandable.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Label from '$lib/components/form/Label.svelte';
	import ProcessTable from './ProcessTable.svelte';

	export let behaviorId: string;
	export let session: Saferwall.Session;

	export let isChild = true;
	export let trees: Saferwall.Behaviors.NestedProcessTree[];

	let processTableOpen: number[] = [];
	const onFilePathClick = (index: number) => {
		processTableOpen = processTableOpen.includes(index)
			? processTableOpen.filter((i) => i !== index)
			: [...processTableOpen, index];
	};
</script>

<ul class={`flex flex-col divide-y ${isChild ? 'border-t border-neutral-100 mt-6' : ''}`}>
	{#each trees as tree, index (tree.path)}
		<li class:pl-12={tree.parent_pid === '0x0'} class:ml-12={tree.parent_pid !== '0x0'}>
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
							<Label class="uppercase">
								{tree.file_type}
							</Label>

							<Label
								theme={tree.detection === 'clean'
									? 'primary'
									: tree.detection === 'malicious'
									? 'danger'
									: 'base'}
							>
								{tree.detection}
							</Label>
						</div>
						<div
							on:click|stopPropagation={() => onFilePathClick(index)}
							class="flex space-x-2 items-center text-neutral-300 transition-all"
							class:text-primary={processTableOpen.includes(index)}
						>
							<Icon
								name={processTableOpen.includes(index) ? 'minus-circle' : 'plus-circle'}
								size="w-5 h-5"
							/>
							<p class="text-neutral-600 text-sm">{tree.path} »</p>
						</div>
						{#if processTableOpen.includes(index)}
							<ProcessTable {behaviorId} {session} pid={tree.pid} />
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
		li {
			@apply cursor-pointer py-6;
		}

		.dot {
			@apply block w-1 h-1 rounded-full bg-black mx-1;
		}
	}
</style>
