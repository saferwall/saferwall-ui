<script lang="ts">
	import type { LayoutData } from './$types';
	import Layout from './_layout.svelte';

	export let data: LayoutData;
</script>

<Layout {data}>
	<slot></slot>
</Layout>
