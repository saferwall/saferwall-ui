<script lang="ts">
	import RenderObject from '$lib/components/nest/RenderObject.svelte';
import type { Saferwall } from '$lib/types';

	export let data: Saferwall.Pe.LoadConfig.DVRT.Root;
</script>

<div class="body">
	<div class="flex flex-col gap-2">
		<RenderObject obj={data} />
	</div>
</div>

<style lang="postcss">
	.body {
	}
</style>
