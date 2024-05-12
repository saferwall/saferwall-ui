<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import type { Saferwall } from '$lib/types';
	import Card from '../../Card.svelte';

	export let screenshots: Saferwall.Screenshots;

	const MEX_DISPLAY_SCREENSHOTS = 6;
	$: showAll = false;
	$: activeScreenshots = screenshots.slice(
		0,
		showAll ? screenshots.length : MEX_DISPLAY_SCREENSHOTS
	);

	const onClickMoreToggle = () => (showAll = !showAll);
</script>

<Card>
	<h1 class="card__title">Virtual Screens</h1>
	<div class="relative grid md:grid-cols-2 lg:grid-cols-3 gap-2 pb-12">
		{#each activeScreenshots as image, index}
			<a href={image.original} target="_blank" class="virtual__preview">
				<img
					src={image.preview}
					alt="Screenshot {index + 1}"
					width={470}
					height={290}
					class="object-contain w-full h-full"
				/>
			</a>
		{/each}
	</div>

	<ButtonShowMore on:click={onClickMoreToggle} expanded={showAll} />
</Card>

<style lang="scss">
	.virtual {
		&__preview {
			@apply w-full bg-gray-100 border border-gray-100 rounded bg-cover mx-auto overflow-hidden;
		}
	}
</style>
