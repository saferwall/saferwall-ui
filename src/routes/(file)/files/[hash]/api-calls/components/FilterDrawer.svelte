<script lang="ts">
	import { SaferwallClient } from '$lib/clients/saferwall';
	import Drawer from '$lib/components/Drawer.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import type { Saferwall } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';
	import CheckBox from '$lib/components/form/CheckBox.v2.svelte';
	import Label from '$lib/components/form/Label.svelte';
	import { twMerge } from 'tailwind-merge';
	import Button from '$lib/components/form/Button.svelte';

	export let behaviorId: string;
	export let client: SaferwallClient;

	const dispatch = createEventDispatcher();

	export let open = false;
	export let pids: string[];
	let processItems: Saferwall.Behaviors.ProcessItem[] = [];

	let query = "";

	const setChecked = () => {
		checked = processItems.map(item => {
				return [item.pid, pids.includes(item.pid)] as [string, boolean];
			}).reduce((p, c) => {
				p[c[0]] = c[1];
				return p;
			}, {} as Record<string, boolean>);
	}
	let mounted = false;
	onMount(() => {
		client.getFileProcessTree(behaviorId).then((items) => {
			processItems = items;
			setChecked();
			mounted = true;
		});
	});

	$: if (open === false) {
		setChecked();
	}

	let checked: Record<string, boolean> = {};
	
</script>

<Drawer bind:open size="md">
	<div class="flex flex-1 h-full w-full flex-col">
		<div class="flex flex-col p-6 pb-2 gap-4 border-b border-line-surface">
			<div class="grid grid-cols-3 w-full items-center">
				<div class="col-span-1">
					<!-- DONT REMOVE -->
				</div>
				<div class="col-span-1 flex items-center justify-center space-x-3 justify-self-center">
					<Icon name="tune" size="w-4 h-4" class="text-primary-icn"/>
					<span class="font-medium">Process Filter</span>
				</div>
				<!-- <div class="col-span-1 justify-self-end">
					<Button theme="brand" class="w-24" size="md">Apply</Button>
				</div> -->
			</div>
			<div class="text-gray-500">
				<Input name="search" class="text-primary-text" bind:value={query} icon="search" placeholder="Quick search..." />
			</div>
		</div>
		<div class="flex-1 flex flex-col gap-2 overflow-y-auto pl-6 max-md:p-6 pb-6 divide-line-surface divide-y">
			{#if mounted}
				{#each processItems.filter((v) => !query || JSON.stringify(Object.values(v)).toLowerCase().includes(query.toLowerCase())) as item}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="wrapper" on:click={() => {
						checked[item.pid] = !checked[item.pid];
					}}>
						<CheckBox bind:checked={checked[item.pid]}/>
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="content">
							<div class="basic">
								<div>
									<span class="text-xs">PID (0x<span class="uppercase">{item.pid.replace(/^0x/, "")}</span>)</span>
									<Label size="xs" class="bg-tertiary-surface text-primary-text">
										Parent PID (0x<span class="uppercase">{item.parent_pid.replace(/^0x/, "")}</span>)
									</Label>
								</div>
								<p class="truncate">{item.proc_name}</p>
								{#if item.file_type}
									<Label class="uppercase rounded-sm px-[11px] py-[4px] {twMerge("bg-[#498B5A]/10 text-[#498B5A]", item.file_type === "exe" ? "bg-blue-600/10 text-blue-600" : "")}">
										{item.file_type}
									</Label>
								{/if}
								{#if item.detection !== ""}
									<Label class="capitalize {item.detection === "malicious" ? "text-alert-red bg-[#ED4060]/10" : (item.detection === "clean" ? "text-[#498B5A] bg-[#498B5A]/10" : "")}">
										<div class="flex gap-1 items-center capitalize">
											{#if item.detection !== "unknown"}
												<Icon class="size-4 flex flex-col items-center justify-center {item.detection === "malicious" ? "-translate-y-[1px]" : ""}" name={item.detection === "malicious" ? "unsafe" : (item.detection === "clean" ? "info" : "")}></Icon>
											{/if}
											<span class="capitalize">
												{item.detection}
											</span>
										</div>
									</Label>
								{/if}
							</div>
							<p class="font-regular text-sm text-secondary-text break-all">
								{item.path} »
							</p>
						</div>
					</div>
				{/each}
			{:else}
				<center class="w-full">Loading...</center>
			{/if}
		</div>
		<div class="controls py-4 px-6 flex gap-4 border-t border-line-surface">
			<Button
				class="rounded-sm {Object.entries(checked).every(([,v]) => !v) ? "text-secondary-text" : "text-primary-text"} underline border-none"
				on:click={() => {
					checked = Object.fromEntries(Object.entries(checked).map(item => [item[0], false]));
				}}
			>
				Clear all
			</Button>
			<Button
				class="rounded-sm flex-grow bg-brand-surface text-white"
				on:click={() => {
					pids = Object.entries(checked).filter(([,_]) => _).map(([_,]) => _);
					open = false;
				}}
			>
				Apply
			</Button>
		</div>
	</div>
</Drawer>


<style lang="postcss">
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
