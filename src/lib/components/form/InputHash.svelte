<script lang="ts">
	export let hash = '';

	let ref: any;
	const onHashMouseUp = () => {
		ref.select();
	};
</script>

<p
	on:mouseup={onHashMouseUp}
	class="w-full flex items-center bg-neutral-100 rounded px-4 space-x-2"
>
	<a href="/files/{hash}" class="hover:text-primary text-neutral-500">
		<svg class="w-4 h-4 ">
			<use href="/images/icons.svg#icon-link" />
		</svg>
	</a>
	<input
		bind:this={ref}
		class="w-full py-2.5 bg-transparent focus:outline-none"
		type="text"
		value={hash}
		readonly
	/>
</p>
