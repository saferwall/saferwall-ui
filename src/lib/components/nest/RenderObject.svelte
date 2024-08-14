<script lang="ts">
	import { translateKeyToTitle } from "$lib/utils";
	import Icon from "../Icon.svelte";
	import Table from "./Table.svelte";
	import TablePrimitive from "./TablePrimitive.svelte";

	export let obj: Record<string | number, any> = {};

	export let path: (string | number)[] = [];
	
	function score(o: any) {
		// Array: 2, Record: 1, primitive: 0
		return +(typeof o === "object") + (+Array.isArray(o));
	}

	$: realObject = path.reduce((p, c) => {
		// debugger;
		return p[c]
	}, obj);
	$: entries = (() => {
		// debugger;
		return !Array.isArray(realObject) ? [...Object.entries(realObject)].filter(([, value]) => typeof value === "object").toSorted(([, a], [, b]) => {
			return score(a) - score(b);
		}) : [];
	})();
	$: primitiveEntries = (() => {
		// debugger;
		return !Array.isArray(realObject) ? [...Object.entries(realObject)].filter(([, value]) => typeof value !== "object") : [];
	})();
	$: console.log({obj, path, realObject, entries, primitiveEntries});
</script>

<div class="flex items-center p-0.5 border rounded-full border-zinc-300 dark:border-zinc-700 w-fit">
	{#each ["Root", ...path] as item, index}
		<button class="
			flex gap-2 items-center
			py-1 px-3
			rounded-full
			hover:dark:bg-white/10 hover:bg-black/10"
			on:click={() => {
				path = path.slice(0, index);
			}}>
			<h4 class="underline">
				{#if typeof item === "number"}
					[{item}]
				{:else}
					{item}
				{/if}
			</h4>
			<Icon name="arrow-down" class="-rotate-90 translate-y-[1px]" size="size-3"></Icon>
		</button>
	{/each}
</div>
{#if Array.isArray(realObject)}
	{#if realObject.length}
		<h3 class="text-md">
			{translateKeyToTitle(path[path.length - 1].toString(), true)}
		</h3>
		{#if typeof realObject[0] !== "object"}
			<TablePrimitive value={realObject}></TablePrimitive>
		{:else}
			<Table bind:path value={realObject}></Table>
		{/if}
	{:else}
		<h3 class="text-md">
			{translateKeyToTitle(path[path.length - 1].toString(), true)}: [ empty ]
		</h3>
	{/if}
{:else}
	{#if primitiveEntries.length}
		<Table showNumbers={false} value={[Object.fromEntries(primitiveEntries)]}></Table>
	{/if}
	{#each entries as [key, value]}
		<h3 class="text-md">
			{translateKeyToTitle(key, true)}{#if Array.isArray(value) && value.length === 0}: [ empty ]{/if}
		</h3>
		{#if Array.isArray(value)}
			{#if value.length}
				{#if typeof value[0] !== "object"}
					<TablePrimitive {value}></TablePrimitive>
				{:else}
					<Table tableKey={key} bind:path {value}></Table>
				{/if}
			{/if}
		{:else if typeof value === "object"}
			<Table showNumbers={false} tableKey={key} bind:path value={[value]}></Table>
		<!-- {:else} -->
		{/if}
	{/each}
{/if}
		