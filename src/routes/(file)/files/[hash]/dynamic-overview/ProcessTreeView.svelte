<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import Expandable from './Expandable.svelte';

	export let trees: Saferwall.Behaviors.NestedProcessTree[];
	export let indent = 0;
</script>

<ul class="flex flex-col gap-2">
	{#each trees as tree, i (tree.path)}
		<li>
			<div style="padding-left: {indent}px" class="cursor-pointer">
				{#if i != 0 || tree.parent_pid != '0x0'}
					<div class="h-[1px] bg-gray-200 my-3" />
				{/if}
				<Expandable isExpandable={tree.children.length != 0}>
					<svelte:fragment slot="header">
						<div class="flex items-center gap-2">
							<div class="font-medium">
								<span>
									{tree.pid}
								</span>
								<svg
									class="inline mx-1"
									xmlns="http://www.w3.org/2000/svg"
									width="4"
									height="5"
									viewBox="0 0 4 5"
									fill="none"
								>
									<path
										d="M2 4.5C3.10457 4.5 4 3.60457 4 2.5C4 1.39543 3.10457 0.5 2 0.5C0.89543 0.5 0 1.39543 0 2.5C0 3.60457 0.89543 4.5 2 4.5Z"
										fill="black"
									/>
								</svg>
								<span>
									{tree.proc_name}
								</span>
							</div>
							<div class="uppercase bg-gray-100 p-2 rounded-md font-bold">
								{tree.file_type}
							</div>
							<div
								class="capitalize rounded-md font-bold bg-gray-100 p-2"
								class:clean={tree.detection === 'clean'}
								class:mal={tree.detection == 'malicious'}
							>
								{tree.detection}
							</div>
						</div>
						<p class="text-gray-500 mt-1 ml-5">{tree.path} »</p>
					</svelte:fragment>
					<svelte:fragment slot="expanded">
						<svelte:self trees={tree.children} indent={indent + 50} />
					</svelte:fragment>
				</Expandable>
			</div>
		</li>
	{/each}
</ul>

<style>
	.mal {
		@apply bg-rose-100 text-rose-500;
	}

	.clean {
		@apply bg-green-100 text-green-500;
	}
</style>
