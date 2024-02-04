<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import type { Saferwall } from '$lib/types';

	export let data: Saferwall.Pe.LoadConfig.LoadCfgStruct;
</script>

<div class="loadConfig">
	<TableKeyValue header={false} items={Object.entries(data)} deep={true} />
</div>

<style lang="scss">
	:global(.loadConfig tr td:first-child) {
		@apply max-w-full whitespace-nowrap;
		@apply pr-4;
	}

	:global(.loadConfig tr td:last-child) {
		@apply w-full;
	}
</style>
