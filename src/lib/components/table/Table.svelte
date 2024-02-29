<script>
	export let striped = false;
</script>

<table class:table-striped={striped} {...$$props}>
	<slot name="header" />
	<slot />
	<slot name="footer" />
</table>

<style lang="scss">
	table {
		@apply w-full;

		&.table-striped {
			:global(tr) {
				@apply even:bg-gray-50;
			}
			:global(td) {
				@apply py-2 w-1/4;
			}
		}
	}
</style>
