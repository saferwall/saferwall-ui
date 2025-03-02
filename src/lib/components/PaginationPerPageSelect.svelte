<script lang="ts">
	import Select from "./form/Select.svelte";

	export let current: number;
	export let max: number;

	let perPageString = current.toString();

	$: console.log({perPages, max})
	$: perPages = [5, 10, 20, 40, 50, 100, 300].filter((p) => p <= Math.max(5, max));
	$: current = perPages.find(n => n >= Math.max(5, Math.min(max, current)))!
	$: perPageString, toInt();
	$: current, toString();
	function toString() {
		perPageString = current.toString();
	}
	function toInt() {
		// console.log({perPageString, a: [5, 10, 20, 40, 50, 100, 300].filter((p) => p <= Math.max(5, max))})
		
		current = parseInt(perPageString);
	}
	$: console.log({current, perPageString});
</script>

<Select
	name="per_page"
	class="w-fit h-[42px] py-[7px] px-[10px] pr-[5px] pl-[3px] bg-secondary-surface border border-secondary-border text-secondary-text rounded-sm"
	bind:value={perPageString}
>
	{#each perPages as count}
		<option value={count.toString()}>{count}</option>
	{/each}
</Select>
