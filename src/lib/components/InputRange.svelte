<script lang="ts">
	// All standard HTML range input attributes
	let Class = "";
	export { Class as class };
	export let value = 50;
	export let min = 0;
	export let max = 100;
	export let step = 1;
	export let name = "";
	export let id = "";
	export let disabled = false;
	export let required = false;
	export let autocomplete = "off";
	export let title = "";
	export let ariaLabel = "";
	export let tabindex = 0;
	export let datalist = null; // ID of a datalist element if needed
	export let form = ""; // ID of a form element this input belongs to

	// Custom properties
	export let thumbColor = "white"; // white
	export let trackColor = "purple"; // purple
	export let thumbSize = 18;
	export let trackHeight = 10;
	export let trackBorderRadius = 5;
</script>

<input
	type="range"
	bind:value
	{min}
	{max}
	{step}
	{name}
	{id}
	{disabled}
	{required}
	{tabindex}
	{form}
	{autocomplete}
	aria-label={ariaLabel}
	{title}
	list={datalist}
	on:input
	on:focus
	on:blur
	on:change
	on:input
	on:focus
	on:blur
	on:mousedown
	on:mouseover
	on:mouseleave
	on:mouseup
	on:touchstart
	on:touchend
	class={Class}
	style:--thumb-color={thumbColor}
	style:--track-color={trackColor}
	style:--thumb-size="{thumbSize}px"
	style:--track-height="{trackHeight}px"
	style:--track-border-radius="{trackBorderRadius}px"
/>

<style lang="postcss">
	input[type="range"] {
		-webkit-appearance: none;
		width: 100%;
	}
	input[type="range"]:focus {
		outline: none;
	}
	input[type="range"]::-webkit-slider-runnable-track {
		width: 100%;
		height: var(--track-height);
		cursor: pointer;
		animate: 0.2s;
		background: var(--track-color);
		border-radius: 5px;
	}
	input[type="range"]::-webkit-slider-thumb {
		border: 1px solid var(--border-secondary);
		height: var(--thumb-size);
		width: var(--thumb-size);
		border-radius: 50px;
		background: var(--thumb-color);
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: calc((var(--thumb-size) - var(--track-height)) / -2);
	}
	input[type="range"]:focus::-webkit-slider-runnable-track {
		background: var(--track-color);
	}
	input[type="range"]::-moz-range-track {
		width: 100%;
		height: var(--track-height);
		cursor: pointer;
		animate: 0.2s;
		background: var(--track-color);
		border-radius: 5px;
		/* border: 1px solid #000000; */
	}
	input[type="range"]::-moz-range-thumb {
		border: 1px solid var(--border-secondary);
		height: var(--thumb-size);
		width: var(--thumb-size);
		border-radius: 50px;
		background: var(--thumb-color);
		cursor: pointer;
	}
	/* input[type="range"] {
		-webkit-appearance: none;
		width: 100%;

		&:focus {
			outline: none;

			&::-webkit-slider-runnable-track {
				background: var(--track-color);
			}

			&::-ms-fill-lower,
			&::-ms-fill-upper {
				background: var(--track-color);
			}
		}

		&::-webkit-slider-runnable-track,
		&::-moz-range-track,
		&::-ms-track {
			width: 100%;
			height: var(--track-height);
			cursor: pointer;
			animate: 0.2s;
		}

		&::-webkit-slider-runnable-track {
			background: var(--track-color);
			border-radius: 5px;
		}

		&::-moz-range-track {
			background: var(--track-color);
			border-radius: 5px;
			border: 1px solid #000000;
		}

		&::-ms-track {
			background: transparent;
			border-color: transparent;
			color: transparent;
		}

		&::-webkit-slider-thumb,
		&::-moz-range-thumb,
		&::-ms-thumb {
			border: 1px solid black;
			height: var(--thumb-size);
			width: var(--thumb-size);
			border-radius: 50px;
			background: var(--thumb-color);
			cursor: pointer;
		}

		&::-webkit-slider-thumb {
			-webkit-appearance: none;
			margin-top: calc((var(--thumb-size) - var(--track-height)) / -2);
		}

		&::-ms-fill-lower,
		&::-ms-fill-upper {
			background: var(--track-color);
			border: 1px solid #000000;
			border-radius: 10px;
		}
	} */
</style>
