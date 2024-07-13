<script lang="ts">
	import { SaferwallClient } from '$lib/clients/saferwall';
	import Drawer from '$lib/components/Drawer.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import type { Saferwall } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';
	import FilterItem from './FilterItem.svelte';

	export let behaviorId: string;
	export let client: SaferwallClient;

	const dispatch = createEventDispatcher();

	export let open = false;
	export let pids: string[] = [];
	let processItems: Saferwall.Behaviors.ProcessItem[] = [];

	let query: string;

	$: result = query
		? processItems.filter(
				(v) =>
					!query || JSON.stringify(Object.values(v)).toLowerCase().includes(query?.toLowerCase())
			)
		: processItems;

	onMount(() => {
		client.getFileProcessTree(behaviorId).then((items) => {
			processItems = items;
			dispatch('filters', items);
		});
	});
</script>

<Drawer {open} on:close size="md">
	<div class="flex flex-1 h-full w-full flex-col">
		<div class="flex flex-col p-6 gap-4">
			<div class="grid grid-cols-3 w-full items-center">
				<div class="col-span-1">
					<!-- DONT REMOVE -->
				</div>
				<div class="col-span-1 flex items-center justify-center space-x-3 justify-self-center">
					<Icon name="filter" size="w-4 h-4 text-neutral-500" />
					<span class="font-medium text-gray-900">Process Filter</span>
				</div>
				<div class="col-span-1 justify-self-end">
					<Button theme="brand" class="w-24" size="md">Apply</Button>
				</div>
			</div>
			<Input name="search" bind:value={query} icon="search" placeholder="Quick search..." />
		</div>
		<div class="flex-1 flex flex-col gap-2 overflow-y-auto pl-6 max-md:p-6 pb-6 divide-y">
			{#each result as item}
				<FilterItem on:change={() => dispatch('change', pids)} bind:group={pids} {item} />
			{/each}
		</div>
	</div>
</Drawer>
