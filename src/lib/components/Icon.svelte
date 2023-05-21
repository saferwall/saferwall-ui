<script lang="ts">
	let cclass = '';

	export let name: string;
	export let size: string = 'w-6 h-6';

	export { cclass as class };
</script>

<svg class="icon {size} {cclass}">
	<use href="/images/icons.svg#icon-{name}" />
</svg>
