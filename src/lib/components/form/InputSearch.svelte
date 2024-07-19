<script lang="ts">
	import { goto } from '$app/navigation';
	import { isStringSHA256 } from '$lib/utils/helpers';

	import Icon from '../Icon.svelte';
	import Input from './Input.svelte';

	let validHash = true;
	const onInputSearchChange = (event: Event & { target: EventTarget & HTMLInputElement }) => {
		const hash = event.target.value;

		validHash = isStringSHA256(hash);
		if (validHash) {
			goto(`/files/${hash}/summary`);
		}
	};
</script>

<div class="flex relative w-full">
	<Input
		error={!validHash}
		placeholder="Quick file hash lookup"
		class="w-full"
		on:change={onInputSearchChange}
	/>
	<Icon
		name="search"
		size="w-5 h-5"
		class={`${
			validHash ? 'text-gray-300' : 'text-red-500'
		} absolute right-4 top-1/2 -translate-y-1/2`}
	/>
</div>
