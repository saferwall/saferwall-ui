<script lang="ts">
	export let hash = '';

	let ref: any;
	const toggleSelection = () => {
		ref.select();
	};
</script>

<p
	on:mouseup={toggleSelection}
	class="w-full flex items-center bg-grayx-100 rounded px-4 space-x-2"
>
	<a href="/files/{hash}" class="hover:text-primary text-grayx-500">
		<svg class="w-4 h-4 ">
			<use href="/images/images.svg#icon-link" />
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
