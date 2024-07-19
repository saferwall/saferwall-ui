<script lang="ts">
	import { goto } from '$app/navigation';
	import { isStringSHA256 } from '$lib/utils/helpers';

	import Icon from '../Icon.svelte';
	import Input from './Input.svelte';

	let validHash = true;

	const onSearchChange = (event: Event) => {
		const hash = (event.target as HTMLInputElement).value;
		validHash = isStringSHA256(hash);
		if (validHash) {
			goto(`/files/${hash}/summary`);
		}
	};
</script>

<div
	class="flex relative w-[400px] focus-within:w-full focus-within:text-gray-500 text-gray-200 transition-all duration-500"
>
	<Icon
		name="search"
		size="w-5 h-5"
		class={`absolute right-4 top-1/2 -translate-y-1/2 ${validHash ? 'currentColor' : 'text-red-500'}`}
	/>
	<Input
		class="w-full"
		placeholder="Quick file hash lookup"
		error={!validHash}
		on:change={onSearchChange}
	/>
</div>
