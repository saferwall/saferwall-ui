<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { Saferwall } from '$lib/types';
	import ProcessTreeView from './components/ProcessTreeView.svelte';

	export let data;
	$: session = data.session;
	$: behaviorId = data.behaviorId;

	$: processTree = buildProcessTrees(data.processArray);

	const buildProcessTrees = <
		T extends Saferwall.Behaviors.ProcessItem,
		Y extends Saferwall.Behaviors.NestedProcessTree
	>(
		processArray: T[]
	): Y[] => {
		const buildTree = (parentProcess: T): Y => {
			return {
				...(parentProcess as unknown as Y),
				children: processArray
					.filter((process) => process.parent_pid === parentProcess.pid)
					.map((childProcess) => buildTree(childProcess))
			};
		};

		return processArray.reduce((trees: Y[], process) => {
			if (process.parent_pid === '0x0') {
				const tree = buildTree(process);
				return [...trees, tree];
			}
			return trees;
		}, []);
	};
</script>

<div class="flex flex-1 flex-col w-full h-full items-center justify-center">
	<section class="container">
		<Card class="w-full" padding={false}>
			<svelte:fragment slot="header">
				<h1 class="text-2xl">Process Tree</h1>
			</svelte:fragment>
			<ProcessTreeView {behaviorId} {session} trees={processTree} isChild={false} />
		</Card>
	</section>
</div>
