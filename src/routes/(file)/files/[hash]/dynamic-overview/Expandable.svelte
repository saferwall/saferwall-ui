<script>
	export let isExpandable = false;

	let open = true;

	function toggleOpen() {
		open = !open;
	}
</script>

<div class="cursor-pointer flex" on:click={toggleOpen} on:keypress={toggleOpen}>
	{#if isExpandable}
		<svg
			class="rotate-[-90deg] mt-2"
			class:expanded={open}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="25"
			viewBox="0 0 24 25"
			fill="none"
		>
			<path
				d="M6 9.5L12 15.5L18 9.5"
				stroke="#AFAFAF"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{/if}
	<div>
		<slot name="header" />
	</div>
</div>

{#if open && isExpandable}
	<slot name="expanded" />
{/if}

<style>
	.expanded {
		rotate: 90deg;
	}
</style>
