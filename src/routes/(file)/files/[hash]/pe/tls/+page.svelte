<script lang="ts">
	import type { PageData } from './$types';
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import TableKeyValues from '$lib/components/TableKeyValues.svelte';

	export let data: PageData;

	$: items = Object.entries(data.tls.Struct);
	$: callBacks = Object.values(data.tls.Callbacks);
</script>

<article class="space-y-2 pr-4">
	<h1 class="title">TLS</h1>
	<TableKeyValue {items} />
	<TableKeyValues title="Callbacks" items={callBacks} />
</article>

<style lang="scss">
	article {
		@apply space-y-4 py-10;

		&:first-child {
			@apply pt-0;
		}
	}
</style>
