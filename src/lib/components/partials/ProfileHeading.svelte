<script lang="ts">
	export let title: string = '';
</script>

<section class="container mx-auto py-4">
	{#if title}
		<h1 class="text-3xl font-medium">{title}</h1>
	{/if}
</section>
