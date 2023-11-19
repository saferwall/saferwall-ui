<script lang="ts">
	export let name: string;
	export let size: string = 'w-6 h-6';
</script>

<svg on:click class="icon {size} {$$props.class}">
	<use href="/images/icons.svg#icon-{name}" />
</svg>
