<script lang="ts">
	import CommentCard from '$lib/components/cards/comments/CommentCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: comments = data.pagination.items;
</script>

<section class="container mx-auto">
	<div class="flex flex-col space-y-12">
		{#each comments as comment}
			<CommentCard {...comment} />
		{/each}
	</div>
</section>
