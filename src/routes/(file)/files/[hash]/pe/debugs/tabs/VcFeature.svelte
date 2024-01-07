<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import type { Saferwall } from '$lib/types';

	export let item: Saferwall.Debug.FPO;
</script>

<TableKeyValue items={Object.entries(item.Info)} header={false} camelCase={false} />
