<script lang="ts">
	export let name: string;
	export let size: string = 'w-6 h-6';
</script>

<svg class={size}>
	<use href="/images/images.svg#icon-{name}" />
</svg>
