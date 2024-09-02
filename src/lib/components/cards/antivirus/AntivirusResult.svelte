<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { timeSince } from '$lib/utils';

	export let update: number;
	export let output: string;
	export let infected: boolean | undefined = undefined;

	$: lastUpdated = timeSince(update);
	$: isNA = typeof infected !== "boolean";
</script>

<div
	class="
		flex items-center space-x-2 text-xs md:-translate-x-4 translate-x-0
		{isNA ? "text-secondary-text" : (infected ? "text-[#F0465B]" : "text-[#56AC30]")}"
>
	{#if !isNA}
		<Icon size="w-5 h-5" name={infected ? 'alert' : 'check'} class="flex-shrink-0"/>
	{/if}
	<span title={`Last Updated : ${lastUpdated}`}>
		{#if infected === true}
			{output}
		{:else if infected === false}
			{infected ? 'Infected' : 'Clean'}
		{:else}
			N/A
		{/if}
	</span>
</div>
