<script context="module" lang="ts">
	export type PrimitiveType = number | string | boolean | null | undefined;
</script>

<script lang="ts">
	export let value: PrimitiveType;
</script>

{value}{#if typeof value === "number"}&nbsp;({"0x" + value.toString(16)}){/if}