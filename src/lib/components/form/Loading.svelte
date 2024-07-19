<script lang="ts">
	import Icon from '../Icon.svelte';

	export let loading = true;
</script>

<div class="relative">
	<span class:text-transparent={loading}><slot /></span>
	{#if loading}
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<Icon name="loading" class="w-6 h-6 animate-spin" />
		</div>
	{/if}
</div>
