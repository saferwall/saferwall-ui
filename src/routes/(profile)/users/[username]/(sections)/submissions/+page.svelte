<script lang="ts">
	import type { PageData } from './$types';

	import InputHash from '$lib/components/form/InputHash.svelte';
	import ActivityMeta from '$lib/components/ActivityMeta.svelte';
	import ButtonLike from '$lib/components/form/ButtonLike.svelte';

	export let data: PageData;

	$: loggedIn = data.user !== undefined;
	$: items = data.pagination.items || [];
</script>

<ul class="divide-y">
	{#each items as item}
		<li class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 py-6 lg:py-8">
			<div class="w-full space-y-4">
				<InputHash hash={item.file.hash} />
				<ActivityMeta file={item.file} />
			</div>
			<div class="w-full md:w-max">
				<ButtonLike
					class="w-full md:w-max md:border-none"
					size="sm"
					{loggedIn}
					liked={item.liked}
					hash={item.file.hash}
				/>
			</div>
		</li>
	{/each}
</ul>
