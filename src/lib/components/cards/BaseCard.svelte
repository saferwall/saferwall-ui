<script lang="ts">
	let cclass = '';
	export let flex: boolean = true;
	export let padding: boolean = true;

	export { cclass as class };
</script>

<div
	class="card relative overflow-hidden bg-white rounded-xl shadow-base  {cclass}"
	class:card--flex={flex}
	class:card--padding={padding}
>
	<slot />
</div>
