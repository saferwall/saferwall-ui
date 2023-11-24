<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import ProcessTreeView from './ProcessTreeView.svelte';

	export let data;
</script>

<div class="flex flex-1 flex-col w-full h-full items-center justify-center">
	<section class="container">
		<Card class="w-full">
			<h1 class="text-3xl">Process Tree</h1>
			<ProcessTreeView trees={data.processTree} />
		</Card>
	</section>
</div>
