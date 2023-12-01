<script lang="ts">
	export let size: 'base' | 'xs' | 'sm' = 'base';
	export let theme: 'base' | 'gray' | 'primary' | 'warning' | 'info' | 'danger' = 'base';
</script>

<div {...$$props} class={`label label--${size} label--${theme} ${$$props.class}`}>
	<slot />
</div>

<style lang="scss">
	.label {
		@apply inline-block h-max rounded-sm;
		@apply text-sm font-medium;
		@apply px-2 py-1;

		&--base {
			@apply bg-neutral-100 text-neutral-950;
		}

		&--primary {
			@apply bg-primary-100 text-primary-500;
		}

		&--gray {
			@apply bg-neutral-100 text-neutral-900;
		}

		&--danger {
			@apply bg-red-100 text-red-500;
		}

		&--warning {
			@apply bg-red-100 text-orange-500;
		}

		&--info {
			@apply bg-red-100 text-purple-500;
		}

		&--xs {
			@apply text-xs px-1.5 py-[3px];
		}

		&--sm {
			@apply text-xs;
		}
	}
</style>
