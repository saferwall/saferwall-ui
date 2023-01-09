<script lang="ts">
	import BaseCard from '../BaseCard.svelte';
	import ComingSoon from '../partials/ComingSoon.svelte';
</script>

<BaseCard>
	<h1 class="card__title">Virtual Screens</h1>
	<div class="relative grid md:grid-cols-2 lg:grid-cols-3 gap-10 p-6 pb-12">
		<div class="virtual__preview" />
		<div class="virtual__preview hidden md:block" />
		<div class="virtual__preview hidden lg:block" />
		<ComingSoon />
	</div>
</BaseCard>

<style lang="scss">
	.virtual {
		&__preview {
			background-image: url('/images/demo-virutal-screne.webp');
			@apply w-full h-64 bg-gray-100 border border-gray-200 rounded bg-cover max-w-[400px] mx-auto;
		}
	}
</style>
