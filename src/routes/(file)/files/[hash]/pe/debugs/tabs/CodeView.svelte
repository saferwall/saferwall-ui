<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import { signatureToGuid } from '$lib/utils';

	export let data: Saferwall.Debug.CODE_VIEW;

	$: Signature = signatureToGuid(data.Info?.Signature);

	$: items = Object.entries({
		...data.Info,
		Signature
	});
</script>

<TableKeyValue header={false} {items} />
