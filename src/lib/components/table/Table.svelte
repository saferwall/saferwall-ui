<script>
	export let striped = false;
</script>

<table class:table-striped={striped} {...$$props}>
	<slot name="header" />
	<slot />
	<slot name="footer" />
</table>

<style lang="postcss">
	table {
		@apply w-full;

		&.table-striped {
			:global(tr) {
				@apply even:bg-zinc-100 even:dark:bg-zinc-800;
				@apply odd:bg-zinc-200 odd:dark:bg-zinc-700;
			}
			:global(td) {
				@apply py-2 w-1/4;
				@apply first:rounded-l last:rounded-r;
			}
		}
	}
</style>
