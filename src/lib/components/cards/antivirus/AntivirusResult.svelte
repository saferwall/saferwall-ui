<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	export let output: string;
	export let infected: boolean;
	export let update: number;
</script>

<div
	class="flex items-center space-x-2 text-sm"
	class:text-redx={infected}
	class:text-greenx={!infected}
>
	<Icon size="w-5 h-5" name={infected ? 'alert' : 'check'} />
	<span>
		{#if infected}
			{output}
		{:else}
			{infected ? 'Infected' : 'Clean'}
		{/if}
	</span>
</div>
