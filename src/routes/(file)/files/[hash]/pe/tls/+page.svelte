<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import TableKeyValues from '$lib/components/TableKeyValues.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: items = Object.entries(data.tls?.Struct ?? {});
	$: callBacks = Object.values(data.tls?.Callbacks ?? {});
</script>

<article class="space-y-2 pr-4">
	<h1 class="title">TLS</h1>
	<TableKeyValue {items} />
	{#if callBacks.length}
		<TableKeyValues title="Callbacks" items={callBacks} />
	{/if}
</article>

<style lang="scss">
	article {
		@apply space-y-4 py-10;

		&:first-child {
			@apply pt-0;
		}
	}
</style>
