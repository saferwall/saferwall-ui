<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import { signatureToGuid } from '$lib/utils';

	export let data: Saferwall.Debug.CODE_VIEW;

	$: signature = signatureToGuid(data.info?.signature);

	$: items = Object.entries({
		...data.info,
		signature
	});
</script>

<TableKeyValue header={false} {items} />
