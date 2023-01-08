<script>
	import { getFileTypeIcon } from '$lib/utils/format';
</script>

<section class="container mx-auto py-2">
	<div
		class="summary flex lg:justify-between flex-wrap lg:flex-nowrap lg:items-center bg-white rounded w-full lg:py-6 lg:px-6 shadow divide-x divide-y lg:divide-y-0"
	>
		<article class="summary__info flex-grow">
			<h2 class="sr-only">Analyse score</h2>
			<div class="flex items-center space-x-6">
				<div class="rounded-full font-bold text-lg bg-gray-200  p-1.5">
					<div class="flex flex-center flex-col w-24 h-24 rounded-full bg-white">
						<span class="text-redx text-2xl">24</span>
						<span class="text-grayx-300">/ 60</span>
					</div>
				</div>
				<p class="font-semibold text-redx">
					24 antivirus venders flagged<br /> this file as malicious
				</p>
			</div>
		</article>
		<article class="summary__info flex-grow lg:flex-grow-0">
			<h2 class="summary__info__title">Signature</h2>
			<p class="summary__info__desc">Not signed</p>
		</article>
		<article class="summary__info flex-grow lg:flex-grow-0">
			<h2 class="summary__info__title">Last scanned</h2>
			<p class="summary__info__desc"><time datetime="2023-01-01 12:00">1 Mounth ago</time></p>
		</article>
		<article class="summary__info flex-grow lg:flex-grow-0">
			<h2 class="summary__info__title">First submission</h2>
			<p class="summary__info__desc"><time datetime="2023-01-01 12:00">01/01/2023</time></p>
		</article>
		<article class="summary__info short flex-grow lg:flex-grow-0">
			<h2 class="sr-only">File type</h2>
			<p>
				<span class="sr-only">pe</span>
				<svg class="w-14 h-14"><use href="/images/images.svg#icon-{getFileTypeIcon('exe')}" /></svg>
			</p>
		</article>
	</div>
</section>

<style lang="scss">
	.summary {
		&__info {
			@apply flex flex-col px-6 py-4 lg:py-0;

			&__title {
				@apply font-medium text-grayx-400 uppercase;
			}

			&__desc {
				@apply font-semibold text-gray-900 text-base;
			}

			&.short {
				@apply px-8;
			}
		}
	}
</style>
