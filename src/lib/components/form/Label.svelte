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
			@apply dark:bg-zinc-700 dark:text-zinc-100;
			@apply bg-zinc-100 text-black;
		}

		&--brand,
		&--primary {
			@apply dark:bg-primary-950/80 dark:text-primary-400;
			@apply bg-primary-100 text-primary-500;
		}

		&--gray {
			@apply dark:bg-zinc-900/80 dark:text-zinc-400;
			@apply bg-zinc-200 text-zinc-900;
		}

		&--danger {
			@apply dark:bg-red-950/80 dark:text-red-400;
			@apply bg-red-100 text-red-500;
		}

		&--warning {
			@apply dark:bg-orange-950/80 dark:text-orange-400;
			@apply bg-orange-100 text-orange-500;
		}

		&--info {
			@apply dark:bg-purple-950/80 dark:text-purple-400;
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
