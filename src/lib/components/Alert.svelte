<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();

	export let close = true;
	export let icon: string = 'close';
	export let type: 'error' | 'warning' | 'success' | 'info' = 'info';

	const onClose = () => {
		dispatch('close');
	};
</script>

<div class={`alert ${type}`}>
	<slot />
	{#if close}
		<div class="cursor-pointer" on:mouseup={onClose}>
			<Icon name={icon} />
		</div>
	{/if}
</div>

<style lang="scss">
	.alert {
		@apply flex items-center justify-between;
		@apply border p-4 rounded font-medium;

		&.error {
			@apply text-red-500 border-red-400;
		}
		&.success {
			@apply text-green-500 border-green-400;
		}
		&.info {
			@apply text-blue-500 border-blue-400;
		}
		&.warning {
			@apply text-orange-500 border-orange-400;
		}
	}
</style>
