<table {...$$props}>
	<slot name="header" />
	<slot />
	<slot name="footer" />
</table>

<style>
	table {
		@apply w-full;
	}
</style>
