<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import type { Saferwall } from '$lib/types';

	export let item: Saferwall.Debug.EX_DLL_CHAR;
	$: items = [['Value', item.Info]];
</script>

<TableKeyValue header={false} {items} hexValue={false} />
