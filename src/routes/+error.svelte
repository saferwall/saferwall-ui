<script lang="ts">
	import { page } from '$app/stores';
	import { randomErrorQuote } from '$lib/utils';

	// $: console.error($page.error);
</script>

<section class="flex flex-col space-x-6 items-center justify-center flex-1">
	<div class="max-w-screen-sm w-full p-4">
		<h4 class="text-xl text-neutral-500">Oops! <span class="text-xs">{$page.status}</span></h4>
		<h3 class="text-3xl text-red">
			{$page.error?.message}
		</h3>
		<p class="italic text-gray-500 mt-8 text-xs">
			{randomErrorQuote()}
		</p>
	</div>
</section>
