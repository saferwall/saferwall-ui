<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import type { Saferwall } from '$lib/types';

	export let data: Saferwall.Debug.REPRO;
</script>

<TableKeyValue header={false} items={Object.entries(data.info)} />
