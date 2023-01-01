<script lang="ts">
	export let hash = '';

	let ref: any;
	const toggleSelection = () => {
		ref.select();
	};
</script>

<p
	on:mouseup={toggleSelection}
	class="hash__ w-full flex items-center bg-grayx-100 rounded px-4 space-x-2"
>
	<svg class="ui_icon w-4 h-4 text-grayx-500">
		<use href="/images/icons.svg#icon-link" />
	</svg>
	<input
		bind:this={ref}
		class="w-full py-2 bg-transparent focus:outline-none"
		type="text"
		readonly
		value={hash}
	/>
</p>
