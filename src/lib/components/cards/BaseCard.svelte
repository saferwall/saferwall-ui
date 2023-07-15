<script lang="ts">
	let cclass = '';
	export let flex = true;
	export let padding = true;
	export let spacing = true;

	export { cclass as class };
</script>

<article
	class="card relative overflow-hidden bg-white rounded-xl shadow-base  {cclass}"
	class:card--flex={flex}
	class:card--padding={padding}
	class:card--spacing={spacing}
>
	<slot />
</article>
