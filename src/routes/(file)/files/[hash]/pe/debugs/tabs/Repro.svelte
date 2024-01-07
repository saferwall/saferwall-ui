<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import type { Saferwall } from '$lib/types';

	export let item: Saferwall.Debug.REPRO;
</script>

<TableKeyValue header={false} items={Object.entries(item.Info)} />
