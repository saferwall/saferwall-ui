<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { getLabelClass, getLabelIcon } from '$lib/utils';
	import Icon from './Icon.svelte';

	export let file: Saferwall.File;

	$: multiav = file.multiav;
	$: labelIcon = getLabelIcon(file.class);
	$: labelClass = getLabelClass(file.class);
</script>

<ul class="meta flex flex-wrap md:flex-nowrap md:items-center md:justify-center">
	<li class="meta__item">
		<span>Classification</span>
		<div class="value capitalize label label--{labelClass}">
			<Icon size="w-5 h-4" name={labelIcon} />
			<span>{labelClass}</span>
		</div>
	</li>
	<li class="meta__item">
		<span>Antivirus</span>
		<div class="value">
			{typeof multiav?.value === 'number' ? multiav?.value + '/' + multiav?.count : 'N/A'}
		</div>
	</li>
	<li class="meta__item grow">
		<span>File Name</span>
		<div class="value">
			<input
				class="w-full bg-transparent border-none truncate"
				type="text"
				value={file.filename}
				readonly
			/>
		</div>
	</li>
</ul>

<style lang="postcss">
	.meta {
		@apply w-full md:gap-4;

		&__item {
			@apply flex flex-col;

			span {
				@apply uppercase;

				&:first-child {
					@apply font-medium text-gray-500;
				}
				&:last-child {
					@apply font-medium text-gray-100;
				}
			}
			.value {
				@apply py-1;
			}
		}
	}

	.label {
		@apply flex items-center gap-0.5;

		&.label--benign, &.label--benign span {
			@apply !text-green;
		}
		&.label--suspicious, &.label--suspicious span {
			@apply !text-orange;
		}
		&.label--malicious, &.label--malicious span {
			@apply !text-red-500;
		}
	}
</style>
