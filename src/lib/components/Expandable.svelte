<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from './Icon.svelte';

	export let expandable = false;

	let open = true;
	const onPress = () => {
		open = !open;
	};
</script>

<div class="flex flex-col">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={onPress} class="cursor-pointer">
		<div class="flex items-start space-x-4">
			{#if expandable}
				<div class="pt-2 text-neutral-400">
					<Icon name="arrow-down" size="w-4 h-3" class={open ? '' : '-rotate-90'} />
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
