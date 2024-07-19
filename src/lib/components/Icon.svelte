<script lang="ts">
	export let name: string;
	export let size: string = 'w-6 h-6';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg on:click class="icon {size} {$$props.class}">
	<use href="/images/icons.svg#icon-{name}" />
</svg>
