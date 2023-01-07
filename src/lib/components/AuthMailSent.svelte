<script lang="ts">
	export let title = '';
	export let description = '';
	export let image = 'illustration-email-sent';
</script>

<div class="px-14 py-20 flex flex-col items-center space-y-6">
	<svg class="ui_icon w-36 h-36"><use href="/images/images.svg#{image}" /></svg>
	<div class="flex flex-col items-center space-y-3">
		<h1 class="text-2xl font-bold">{title}</h1>
		<p class="text-grayx-700">{@html description}</p>
	</div>
</div>
