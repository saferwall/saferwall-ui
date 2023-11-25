<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Label from '$lib/components/form/Label.svelte';
	import type { Saferwall } from '$lib/types';
	import Expandable from '../../../../../lib/components/Expandable.svelte';

	export let parent = true;
	export let trees: Saferwall.Behaviors.NestedProcessTree[];
</script>

<ul class={`flex flex-col divide-y ${parent ? 'border-t border-neutral-100 mt-6' : ''}`}>
	{#each trees as tree (tree.path)}
		<li class:pl-12={tree.parent_pid === '0x0'} class:ml-12={tree.parent_pid !== '0x0'}>
			<Expandable expandable={tree.children.length != 0}>
				<svelte:fragment slot="header">
					<div class="flex flex-col gap-2">
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
							<Label>
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
						<div class="flex space-x-2 items-center text-neutral-300">
							<Icon name="plus-circle" size="w-4 h-4" />
							<p class="text-neutral-600 text-sm">{tree.path} »</p>
						</div>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="expanded">
					<svelte:self trees={tree.children} />
				</svelte:fragment>
			</Expandable>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		li {
			@apply cursor-pointer py-6;
		}

		.dot {
			@apply block w-1 h-1 rounded-full bg-black mx-1;
		}
	}
</style>
