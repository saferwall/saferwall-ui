<script lang="ts">
	import ButtonShowMore from '$lib/components/form/ButtonShowMore.svelte';
	import type { Saferwall } from '$lib/types';
	import BiggerPicture, { type BiggerPictureInstance } from 'bigger-picture/svelte';
	import { onMount } from 'svelte';
	import Card from '../../Card.svelte';

	export let screenshots: Saferwall.Screenshots;

	const MEX_DISPLAY_SCREENSHOTS = 6;
	let imageWidth = 1024;
	let imageHeight = 768;
	let bp: BiggerPictureInstance;

	$: showAll = false;
	$: activeScreenshots = screenshots.slice(
		0,
		showAll ? screenshots.length : MEX_DISPLAY_SCREENSHOTS
	);
	$: allImages = screenshots.map((image, index) => ({
		img: image.original,
		thumb: image.preview,
		alt: 'Screenshot ' + (index + 1),
		width: imageWidth,
		height: imageHeight
	}));

	onMount(() => {
		bp = BiggerPicture({
			target: document.querySelector('.virtual__screens')!
		});
	});

	const onImageClick = (event: MouseEvent & { currentTarget: HTMLElement }, position: number) => {
		event.preventDefault();
		bp.open({
			items: allImages,
			position,
			scale: 1
		});
	};

	const onClickMoreToggle = () => (showAll = !showAll);
</script>

<Card class="rounded-lg">
	<h1 class="card__title">Virtual Screens</h1>
	<div class="virtual__screens">
		{#each activeScreenshots as image, index}
			<a
				href={image.original}
				data-img={image.original}
				data-thumb={image.preview}
				data-width={imageWidth}
				data-height={imageHeight}
				data-alt="Screenshot {index + 1}"
				class="virtual__preview"
				on:click={(event) => onImageClick(event, index)}
			>
				<img src={image.preview} width={470} height={290} alt="Screenshot {index + 1}" />
			</a>
		{/each}
	</div>

	<ButtonShowMore on:click={onClickMoreToggle} expanded={showAll} />
</Card>

<style lang="postcss">
	.virtual {
		&__screens {
			@apply relative grid grid-cols-2 lg:grid-cols-3 gap-2;
		}

		&__preview {
			@apply w-full bg-gray-100 border border-gray-100 rounded bg-cover mx-auto overflow-hidden;

			img {
				@apply object-fill w-full h-full;
			}
		}
	}
</style>
