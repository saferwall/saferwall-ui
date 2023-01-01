<script lang="ts">
	let cclass: string = '';
	export let type: string = 'text';
	export let placeholder: string = '';
	export let name: string = '';

	export { cclass as class };
</script>

<input {type} {name} {placeholder} class="input {cclass}" />

<style lang="scss">
	.input {
		@apply py-3 px-4;
		@apply border rounded;
		@apply placeholder-grayx-500 placeholder:font-light;
	}
</style>
