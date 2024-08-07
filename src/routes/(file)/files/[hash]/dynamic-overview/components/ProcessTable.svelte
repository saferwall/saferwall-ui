<script lang="ts">
	import { SaferwallClient } from '$lib/clients/saferwall';
	import Card from '$lib/components/Card.svelte';
	import Multitoggle from '$lib/components/Multitoggle.svelte';
	import Checkbox from '$lib/components/form/Checkbox.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Label from '$lib/components/form/Label.svelte';
	import type { Saferwall } from '$lib/types';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let pid: string | undefined;
	export let behaviorId: string;
	export let session: Saferwall.Session;

	enum ProcessSections {
		CAPABILITIES = 'capabilities',
		SYSTEM_EVENTS = 'sysevents'
	}

	//TODO: refactore and improve code & filtering
	$: filterByQuery = (item: any) =>
		!query || JSON.stringify(item).toLowerCase().includes(query.toLowerCase());

	let systemEventsItems: Saferwall.Behaviors.SystemEvent[] = [];
	$: filteredSystemEventsItems = systemEventsItems
		.filter((item) => {
			return (
				filtersValue.size === 0 ||
				(item.type === 'file' && filtersValue.has('file')) ||
				(item.type === 'network' && filtersValue.has('network')) ||
				(item.type === 'registery' && filtersValue.has('registery'))
			);
		})
		.filter(filterByQuery);

	let capabilitiesItems: Saferwall.Behaviors.Capability[] = [];
	$: filteredcapabilitiesItems = capabilitiesItems
		.filter((item) => {
			return (
				filtersValue.size === 0 ||
				(item.severity === 'high' && filtersValue.has('high')) ||
				(item.severity === 'suspicious' && filtersValue.has('suspicious')) ||
				(item.severity === 'informative' && filtersValue.has('informative'))
			);
		})
		.filter(filterByQuery);

	let query: string;
	const sections = [
		{
			label: 'Capabilities',
			value: ProcessSections.CAPABILITIES,
			checked: true,
			filters: [
				{ label: 'Informative', value: 'informative' },
				{ label: 'Suspicious', value: 'suspicious' },
				{ label: 'High', value: 'high' }
			]
		},
		{
			label: 'System Events',
			value: ProcessSections.SYSTEM_EVENTS,
			filters: [
				{ label: 'File', value: 'file' },
				{ label: 'Network', value: 'network' },
				{ label: 'Registery', value: 'registery' }
			]
		}
	];

	let filtersValue = new Set<string>([]);
	let selectedSection = sections.find((s) => s.checked)!;

	const onToggleChange = ({ detail }: { detail: Set<any> }) => {
		selectedSection = sections.find((m) => detail.has(m))!;
	};

	const onFilterChange = (value: string) => {
		filtersValue.has(value) ? filtersValue.delete(value) : filtersValue.add(value);
		filtersValue = new Set<string>([...filtersValue]);
	};

	const fetchData = async () => {
		const client = new SaferwallClient(session);
		client.getFileCapabilities(behaviorId, pid).then((res) => (capabilitiesItems = [...res]));
		client.getFileSystemEvents(behaviorId, pid).then((res) => (systemEventsItems = [...res]));
	};

	const getSeverityTheme = (severity: string) => {
		switch (severity) {
			case 'high':
				return 'danger';
			case 'suspicious':
				return 'warning';

			default:
				return 'gray';
		}
	};

	const getOperationTheme = (operation: string) => {
		switch (operation) {
			case 'create':
				return 'warning';
			case 'write':
				return 'danger';
			case 'delete':
				return 'info';

			default:
				return 'gray';
		}
	};

	onMount(() => {
		if (behaviorId) {
			fetchData();
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div transition:slide={{ axis: 'y' }} class="w-full lg:pr-12" on:click|stopPropagation>
	<Card padding={false} class="flex flex-col gap-2 bg-red-100 px-8 py-6 border border-neutral-200">
		<div class="inline-flex uppercase font-medium">
			<Multitoggle items={sections} on:change={onToggleChange} />
		</div>
		<form class="flex flex-row gap-6 lg:gap-12">
			<Input name="search" icon="search" bind:value={query} placeholder="Search anything..." />
			<div class="flex flex-row flex-shrink-0 items-center gap-6">
				<strong class="text-neutral-600">FILTER BY</strong>
				<div class="flex flex-row items-center text-sm font-medium text-gray-800 gap-2">
					{#each selectedSection?.filters as filter}
						<Checkbox
							name="filters"
							type="checkbox"
							value={filter.value}
							checked={filtersValue.has(filter.value)}
							on:click={() => onFilterChange(filter.value)}
						>
							{filter.label}
						</Checkbox>
					{/each}
				</div>
			</div>
		</form>
		<table>
			{#if selectedSection.value === ProcessSections.CAPABILITIES}
				<thead>
					<th>Category</th>
					<th>Description</th>
					<th>Severity</th>
					<th>Module</th>
				</thead>
				<tbody class="divide-y">
					{#each filteredcapabilitiesItems as item}
						<tr>
							<td class="capitalize">{item.category}</td>
							<td>{item.description}</td>
							<td class="capitalize">
								<Label theme={getSeverityTheme(item.severity)}>{item.severity}</Label>
							</td>
							<td class="capitalize">{item.module}</td>
						</tr>
					{/each}
					{#if filteredcapabilitiesItems.length === 0}
						<tr>
							<td colspan="4">
								<p class="empty-result">
									No results with current filters. Try adjusting or expanding your search criteria
								</p>
							</td>
						</tr>
					{/if}
				</tbody>
			{:else}
				<tbody class="divide-y">
					{#each filteredSystemEventsItems as item}
						<tr>
							<td>
								<div class="flex gap-3">
									<p>{item.path}</p>
									<Label size="base" theme={getOperationTheme(item.op)} class="capitalize">
										{item.op}
									</Label>
									<Label size="base" class="bg-neutral-50 text-neutral-800 capitalize">
										{item.type}
									</Label>
								</div>
							</td>
						</tr>
					{/each}
					{#if filteredSystemEventsItems.length === 0}
						<tr>
							<td colspan="4">
								<p class="empty-result">
									No results with current filters. Try adjusting or expanding your search criteria
								</p>
							</td>
						</tr>
					{/if}
				</tbody>
			{/if}
		</table>
	</Card>
</div>

<style lang="postcss">
	table {
		thead {
			@apply text-neutral-400 uppercase;
		}
		tr {
			td {
				@apply py-4;
			}
		}

		.empty-result {
			@apply text-center text-neutral-900 pt-12 pb-6;
		}
	}
</style>
