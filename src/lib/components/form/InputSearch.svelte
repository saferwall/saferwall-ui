<script lang="ts">
	import { goto } from '$app/navigation';
	import { isStringSHA256 } from '$lib/utils/helpers';
	import Button from './Button.svelte';
	import Input from './Input.svelte';

	let validHash = true;
	let hash = "";
	function submit(e: Event) {
		e.preventDefault();
		validHash = isStringSHA256(hash) || !hash;
		hash = hash.trim();
		if (validHash && hash) {
			goto(`/files/${hash}/summary`);
		} else {
			alert(`"${hash}" is an invalid hash`)
		}
	}
</script>

<form
	class="flex relative w-full --max-w-[400px] --focus-within:w-full --focus-within:text-gray-500 --text-gray-200 --transition-all --duration-500"
	on:submit={submit}
>
	<Input
		icon="search"
		iconClass="text-[#5F5F5F]"
		class="text-primary-text w-full border-none py-[15px]"
		parentClass="border {!validHash ? "border-alert-red" : "border-primary-border"} rounded-[10px] px-[3px]"
		placeholder="Quick file hash lookup"
		error={!validHash}
		bind:value={hash}
		on:focus
		on:blur={() => validHash ||= !hash}
	>
		<Button class="h-fit self-center show-on-blur text-white bg-brand-500 px-5 py-2.5"
			on:click={submit}
		>Search</Button>
	</Input>
</form>
