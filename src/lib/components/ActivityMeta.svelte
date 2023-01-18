<script lang="ts">
	import type { APIFile } from '$lib/types/files';
	import { getLabelClass, getLabelIcon } from '$lib/utils/format';

	export let file: APIFile;
</script>

<ul class="meta flex flex-wrap md:flex-nowrap md:items-center md:justify-center">
	<li class="meta__item">
		<span>CLASSIFICATION</span>
		<div class="capitalize label label--{getLabelClass(file.class)}">
			<svg class="w-4 h-4"><use href="/images/images.svg#icon-{getLabelIcon(file.class)}" /></svg>
			<span>{getLabelClass(file.class)}</span>
		</div>
	</li>
	<li class="meta__item">
		<span>ANTIVIRUS</span>
		<span>{file.multiav.value}/{file.multiav.count}</span>
	</li>
	<li class="meta__item grow">
		<span>FILE NAME</span>
		<span class="w-full">
			<input class="w-full" type="text" value={file.filename} />
		</span>
	</li>
</ul>

<style lang="scss">
	.meta {
		@apply w-full md:space-x-4;

		&__item {
			@apply flex flex-col mr-4;

			& span:first-child {
				@apply font-medium text-grayx-400;
			}
			& span:last-child {
				@apply font-medium;
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
