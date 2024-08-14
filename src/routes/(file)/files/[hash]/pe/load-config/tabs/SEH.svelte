<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { valueToHex } from '$lib/utils';

	export let data: Saferwall.Pe.LoadConfig.SEH[];
</script>

<div class="p-6 border border-zinc-300 dark:border-zinc-700 rounded-xl flex flex-col gap-4">
	<h3 class="text-primary text-lg font-semibold">Callbacks</h3>
	<ul class="space-y-2 text-base font-mono">
		{#each data as item}
			<li>
				{valueToHex(item)}
			</li>
		{/each}
	</ul>
</div>
