<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { valueToHex } from '$lib/utils';

	export let data: Saferwall.Pe.LoadConfig.SEH[];
</script>

<div class="p-6 border border-e-neutral-100 rounded-xl flex flex-col gap-4">
	<h3 class="text-primary text-lg font-semibold">Callbacks</h3>
	<ul class="space-y-2 text-md">
		{#each data as item}
			<li>
				{valueToHex(item)}
			</li>
		{/each}
	</ul>
</div>
