<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import { signatureToGuid } from '$lib/utils';

	export let item: Saferwall.Debug.CODE_VIEW;

	$: Signature = signatureToGuid(item.Info?.Signature);

	$: items = Object.entries({
		...item.Info,
		Signature
	});
</script>

<TableKeyValue header={false} {items} />
