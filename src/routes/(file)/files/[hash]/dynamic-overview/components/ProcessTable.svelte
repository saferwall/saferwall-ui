<script lang="ts">
	import { SaferwallClient } from '$lib/clients/saferwall';
	import Card from '$lib/components/Card.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Multitoggle from '$lib/components/Multitoggle.svelte';
	import Checkbox from '$lib/components/form/Checkbox.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Label from '$lib/components/form/Label.svelte';
	import type { Saferwall } from '$lib/types';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let pid: string | undefined;
	export let behaviorId: string;
	export let client: SaferwallClient;

	enum ProcessSections {
		CAPABILITIES = 'capabilities',
		SYSTEM_EVENTS = 'sysevents'
	}

	//TODO: refactore and improve code & filtering
	$: filterByQuery = (item: any) =>
		!query || JSON.stringify(item).toLowerCase().includes(query.toLowerCase());

	let systemEventsItems: Saferwall.Behaviors.SystemEvent[] | null = null;
	$: filteredSystemEventsItems = (systemEventsItems ?? [])
		.filter((item) => {
			return (
				filtersValue.size === 0 ||
				(item.type === 'file' && filtersValue.has('file')) ||
				(item.type === 'network' && filtersValue.has('network')) ||
				(item.type === 'registery' && filtersValue.has('registery'))
			);
		})
		.filter(filterByQuery);

	let capabilitiesItems: Saferwall.Behaviors.Capability[] | null = null;

	$: filteredcapabilitiesItems = (capabilitiesItems ?? [])
		.filter((item) => {
			return (
				filtersValue.size === 0 ||
				(item.severity === 'high' && filtersValue.has('high')) ||
				(item.severity === 'suspicious' && filtersValue.has('suspicious')) ||
				(item.severity === 'low' && filtersValue.has('low'))
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
				{ label: 'Low', value: 'low' },
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

	const getSeverityDataTheme = (severity: string) => {
		switch (severity) {
			case 'high':
				return { class: 'text-[#B73D32]', icon: "backlight" };
			case 'suspicious':
				return { class: 'text-[#ED8C1A]', icon: "target" };

			default:
				return { class: "text-[#634FE1]", icon: "info" };
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

	const getOperationDataTheme = (operation: string) => {
		switch (operation) {
			case 'create':
				return "text-[#498B5A] bg-[#498B5A]/15";
			case 'write':
				return "text-[#C58837] bg-[#C58837]/15";
			case 'delete':
				return "text-[#ED63C2] bg-[#ED63C2]/15";
			case "read":
				return "text-[#4675E2] bg-[#4675E2]/15";
			default:
				return "text-primary-text bg-tertiary-surface";
		}
	};

	onMount(() => {
		if (behaviorId) {
			fetchData();
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div transition:slide={{ axis: 'y' }} class="w-full lg:pr-12 pb-3" on:click|stopPropagation>
	<Card padding={false} class="flex flex-col gap-2 bg-p-tree-surface px-[1.125rem] py-[1.125rem] pb-5 border border-primary-border rounded-lg">
		<div class="inline-flex uppercase font-medium">
			<Multitoggle items={sections} on:change={onToggleChange} />
		</div>
		<form class="flex flex-row gap-6 lg:gap-12 text-gray-500">
			<Input name="search" icon="search" bind:value={query} placeholder="Search anything..." class="border-elm-border placeholder:text-searchbar-text" />
			<div class="flex flex-row flex-shrink-0 items-center gap-6">
				<strong class="text-tertiary-text">FILTER BY</strong>
				<div class="flex flex-row items-center text-xs font-medium text-primary-text gap-4">
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
				<thead class="[&_th]:text-tertiary-text">
					<th>Category</th>
					<th>Operation</th>
					<th>Severity</th>
					<th>Module</th>
				</thead>
				<tbody class="divide-y divide-line-sec-surface">
					{#each filteredcapabilitiesItems as item}
						<tr>
							<td class="capitalize">{item.category}</td>
							<td>{item.description}</td>
							<td class="capitalize flex gap-2 items-center">
								<Icon size="size-5" name={getSeverityDataTheme(item.severity).icon} class="{getSeverityDataTheme(item.severity).class}"></Icon>
								<span class="{getSeverityDataTheme(item.severity).class}">{item.severity}</span>
							</td>
							<td class="capitalize">{item.module}</td>
						</tr>
					{/each}
					{#if filteredcapabilitiesItems.length === 0}
						<tr>
							<td colspan="4">
								{#if capabilitiesItems !== null}
									<p class="empty-result">
										No results with current filters. Try adjusting or expanding your search criteria
									</p>
								{:else}
									<p class="empty-result">
										Loading...
									</p>
								{/if}
							</td>
						</tr>
					{/if}
				</tbody>
			{:else}
				<tbody class="divide-y divide-neutral-500">
					{#each filteredSystemEventsItems as item}
						<tr>
							<td>
								<div class="flex items-center gap-3">
									<p>{item.path}</p>
									<span class="px-[11px] py-[4px] rounded-sm font-semibold capitalize {getOperationDataTheme(item.op)}">
										{item.op}
									</span>
									<Label size="base" class="capitalize">
										{item.type}
									</Label>
								</div>
							</td>
						</tr>
					{/each}
					{#if filteredSystemEventsItems.length === 0}
						<tr>
							<td colspan="4">
								{#if systemEventsItems !== null}
									<p class="empty-result">
										No results with current filters. Try adjusting or expanding your search criteria
									</p>
								{:else}
									<p class="empty-result">
										Loading...
									</p>
								{/if}
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
			@apply text-zinc-500 uppercase;
		}
		tr {
			td {
				@apply py-4;
			}
		}

		.empty-result {
			@apply text-center text-zinc-900 dark:text-zinc-100 pt-12 pb-6;
		}
	}
</style>
