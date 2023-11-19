<script lang="ts">
	import Card from '../../Card.svelte';
	import ComingSoon from '../../partials/ComingSoon.svelte';
</script>

<Card>
	<h1 class="card__title">Virtual Screens</h1>
	<div class="relative grid md:grid-cols-2 lg:grid-cols-3 gap-10 pb-12">
		<div class="virtual__preview" />
		<div class="virtual__preview hidden md:block" />
		<div class="virtual__preview hidden lg:block" />
		<ComingSoon />
	</div>
</Card>

<style lang="scss">
	.virtual {
		&__preview {
			@apply w-full h-64 bg-gray-400 border border-gray-200 rounded bg-cover mx-auto;
		}
	}
</style>
