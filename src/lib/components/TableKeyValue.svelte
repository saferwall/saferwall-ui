<script lang="ts">
	import { cn, translateKeyToTitle, valueToHex } from '$lib/utils';
	import ButtonShowMore from './form/ButtonShowMore.svelte';
	import Table from './table';

	export let className = '';
	export let deep = true;
	export let lines = false;
	export let header: boolean | string[] = true;
	export let hexValue = true;
	export let camelCase = true;
	export let items: any[][] = [];
	export let maxRecords: undefined | number = undefined;
	export let parent = true;

	$: expanded = false;
	$: onClickExpend = () => {
		expanded = !expanded;
	};

	export { className as class };
</script>

<Table.Root class={cn(deep && !parent && 'pt-0', className)}>
	<Table.Body class={cn(lines ? `divide-y divide-zinc-300 dark:divide-zinc-700` : '')}>
		{#if header}
			<Table.Row>
				{#if Array.isArray(header)}
					{#each header as item, index}
						<Table.Val
							class={cn(
								'font-medium text-base align-top',
								index === 0 ? '' : 'w-full',
								!header && 'font-medium whitespace-nowrap max-w-full pr-4'
							)}>{item}</Table.Val
						>
					{/each}
				{:else}
					<Table.Val class="font-medium text-base align-top">Member</Table.Val>
					<Table.Val class="font-medium text-base align-top">Value</Table.Val>
				{/if}
			</Table.Row>
		{/if}
		{#each items as [key, value], index}
			{#if !maxRecords || expanded || index < maxRecords}
				<Table.Row class="p-2">
					<Table.Val
						class={cn(!header && 'font-medium align-top whitespace-nowrap max-w-full pr-4')}
					>
						{camelCase ? translateKeyToTitle(key) : key}
					</Table.Val>
					{#if deep && typeof value === 'object' && !Array.isArray(value)}
						<Table.Val class={cn(deep && 'pt-0 px-0', !header && 'w-full')}>
							<svelte:self
								items={Object.entries(value)}
								{lines}
								parent={false}
								header={!!header}
								{camelCase}
								{hexValue}
								{deep}
							/>
						</Table.Val>
					{:else}
						<Table.Val class={cn(!header && 'w-full')}>
							{hexValue && value !== undefined ? valueToHex(value) : value ?? ''}
						</Table.Val>
					{/if}
				</Table.Row>
			{/if}
		{/each}
		{#if maxRecords && items.length >= maxRecords}
			<Table.Row>
				<Table.Val colspan={2}>
					<ButtonShowMore bind:expanded on:click={onClickExpend} />
				</Table.Val>
			</Table.Row>
		{/if}
		<slot />
	</Table.Body>
</Table.Root>
