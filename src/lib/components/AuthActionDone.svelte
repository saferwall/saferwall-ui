<script lang="ts">
	export let title = '';
	export let description = '';
	export let image = 'illustration-email-sent';
	export let imageSize = 'w-36 h-36';
</script>

<div class="px-14 py-16 flex flex-col items-center space-y-6">
	<svg class={imageSize}><use href="/images/icons.svg#{image}" /></svg>
	<div class="flex flex-col items-center space-y-3">
		<h1 class="text-2xl font-bold">{title}</h1>
		<p class="text-neutral-700">{@html description}</p>
	</div>
	<slot />
</div>
