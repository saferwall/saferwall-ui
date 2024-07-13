<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { timeSince } from '$lib/utils';

	export let update: number;
	export let output: string;
	export let infected: boolean;

	$: lastUpdated = timeSince(update);
	$: isNA = infected === true || infected === false;
</script>

<div
	class="flex items-center space-x-2 text-xs"
	class:text-red={infected === true}
	class:text-green={infected === false}
	class:text-gray-300={!isNA}
>
	{#if isNA}
		<Icon size="w-5 h-5" name={infected ? 'alert' : 'check'} />
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
