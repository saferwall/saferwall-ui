<script lang="ts">
	export let loading = true;
</script>

{#if loading}
	<svg class="w-6 h-6 animate-spin"><use href="/images/icons.svg#icon-loading" /></svg>
{:else}
	<slot />
{/if}
