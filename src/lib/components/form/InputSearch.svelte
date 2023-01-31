<script>
	import Icon from '../Icon.svelte';
	import Input from './Input.svelte';
</script>

<div class="flex relative w-full">
	<Input placeholder="Quick file hash lookup" class="w-full" />
	<Icon
		name="search"
		size="w-5 h-5"
		class="text-gray-300 absolute right-4 top-1/2 -translate-y-1/2"
	/>
</div>
