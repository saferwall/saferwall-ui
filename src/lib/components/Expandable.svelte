<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from './Icon.svelte';

	export let expandable = false;
	export let open = true;

	const onPress = () => {
		open = !open;
	};
</script>

<div class="flex flex-col">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	 <!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click={onPress} class="cursor-pointer">
		<div class="flex items-center gap-[12px]">
			{#if expandable}
				<div class="text-neutral-400 border border-brand rounded-full transition-transform {open ? 'bg-brand-surface' : '-rotate-90 text-brand'} w-5 h-5 flex justify-center items-center">
					<Icon name="arrow-down" size="w-2.5 h-2.5" class="translate-y-[1px] transition-colors {open ? 'text-white' : 'text-brand'}" />
				</div>
			{/if}
			<slot name="header" />
		</div>
	</div>

	{#if open && expandable}
		<div transition:slide>
			<slot name="expanded" />
		</div>
	{/if}
</div>
