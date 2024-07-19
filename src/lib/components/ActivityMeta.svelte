<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { getLabelClass, getLabelIcon } from '$lib/utils';
	import Icon from './Icon.svelte';

	export let file: Saferwall.File;

	$: labelIcon = getLabelIcon(file.class);
	$: labelClass = getLabelClass(file.class);
</script>

<ul class="meta flex flex-wrap md:flex-nowrap md:items-center md:justify-center">
	<li class="meta__item">
		<span>Classification</span>
		<div class="capitalize label label--{labelClass}">
			<Icon size="w-5 h-4" class="mr-1" name={labelIcon} />
			<span>{labelClass}</span>
		</div>
	</li>
	<li class="meta__item">
		<span>Antivirus</span>
		<div>
			{typeof file?.multiav?.value === 'number'
				? file?.multiav?.value + '/' + file?.multiav?.count
				: 'N/A'}
		</div>
	</li>
	<li class="meta__item grow">
		<span>File Name</span>
		<div class="w-full">
			<input class="w-full" type="text" value={file.filename} readonly />
		</div>
	</li>
</ul>

<style lang="scss">
	.meta {
		@apply w-full md:space-x-4;

		&__item {
			@apply flex flex-col mr-4;

			span {
				@apply uppercase;

				&:first-child {
					@apply font-medium text-neutral-400;
				}
				&:last-child {
					@apply font-medium;
				}
			}
		}
	}

	.label {
		@apply flex items-center space-x-1;

		&--benign {
			@apply text-greenx;
		}
		&--unknown {
			@apply text-orangex;
		}
		&--malicious {
			@apply text-red-500;
		}
	}
</style>
