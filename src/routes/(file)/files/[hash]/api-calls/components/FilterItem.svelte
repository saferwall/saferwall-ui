<script lang="ts">
	import Checkbox from '$lib/components/form/Checkbox.svelte';
	import Label from '$lib/components/form/Label.svelte';
	import { Saferwall } from '$lib/types';
	import { createEventDispatcher, tick } from 'svelte';

	const dispatch = createEventDispatcher();

	export let item: Saferwall.Behaviors.ProcessItem;
	export let group: any[] = [];

	const toggleCheckbox = async (e: MouseEvent) => {
		await tick();
		group = group.includes(pid) ? group.filter((i: string) => i !== pid) : [...group, pid];
		dispatch('change');
	};

	$: pid = item.pid;
	$: status = item.detection?.toLowerCase();
	$: detectionTheme = (
		status == Saferwall.Behaviors.Detection.CLEAN
			? 'brand'
			: status == Saferwall.Behaviors.Detection.MALICIOUS
				? 'danger'
				: 'gray'
	) as any;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:change={() => dispatch('change')} class="wrapper">
	<Checkbox checked={group.includes(pid)} name="pid[]" value={pid} />
	<div class="content" on:mouseup|stopPropagation={toggleCheckbox}>
		<div class="basic">
			<div>
				<span class="text-xs">PID ({pid})</span>
				<Label size="xs">Parent PID ({item.parent_pid})</Label>
			</div>
			<div class="h-3.5 w-0.5 rounded-xl bg-primary/80" />
			<p class="truncate">{item.proc_name}</p>
			{#if item.file_type}
				<Label class="uppercase">{item.file_type}</Label>
			{/if}
			{#if item.detection}
				<Label theme={detectionTheme}>{item.detection}</Label>
			{/if}
		</div>
		<p class="font-light text-xs text-neutral-600 break-all">
			{item.path}
		</p>
	</div>
</div>

<style lang="scss">
	.wrapper {
		@apply flex flex-row justify-center items-center gap-3 py-5 cursor-pointer;

		.content {
			@apply flex flex-1 flex-col;

			.basic {
				@apply flex flex-wrap gap-2 w-full items-center;
			}
		}
	}
</style>
