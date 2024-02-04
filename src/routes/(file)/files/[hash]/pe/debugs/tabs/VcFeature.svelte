<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import type { Saferwall } from '$lib/types';

	export let data: Saferwall.Debug.FPO;
</script>

<TableKeyValue items={Object.entries(data.Info)} header={false} camelCase={false} />
