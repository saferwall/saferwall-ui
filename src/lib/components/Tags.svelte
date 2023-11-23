<script lang="ts">
	export let tags: string[] = [];
</script>

<ul class="flex flex-wrap lg:flex-nowrap">
	{#each tags as tag}
		<li
			class="tags__tag mr-2 mb-1 lg:mb-0 block px-4 py-2 rounded bg-neutral-100 text-gray-900 tags__tag--{tag}"
		>
			{tag}
		</li>
	{/each}
</ul>
