<script lang="ts">
	export let size: 'lg' | 'base' | 'xs' | 'sm' = 'base';
	export let theme: 'base' | 'gray' | 'warning' | 'info' | 'danger' | 'brand' | 'primary' = 'base';
</script>

<div {...$$props} class={`label label--${size} label--${theme} ${$$props.class}`}>
	<slot />
</div>

<style lang="postcss">
	.label {
		@apply inline-block h-max rounded-sm;
		@apply text-xs font-medium;
		@apply px-2 py-1;

		&--base {
			@apply bg-neutral-100 text-neutral-950;
		}

		&--brand,
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
			@apply bg-orange-100 text-orange-500;
		}

		&--info {
			@apply bg-purple-100 text-purple-500;
		}

		&--lg {
			@apply text-xs px-3 py-1.5 rounded;
		}

		&--xs {
			@apply text-xs px-1.5 py-[3px];
		}

		&--sm {
			@apply text-xs;
		}
	}
</style>
