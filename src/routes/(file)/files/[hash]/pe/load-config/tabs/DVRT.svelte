<script lang="ts">
	import type { Saferwall } from '$lib/types';

	export let data: Saferwall.Pe.LoadConfig.DVRT.Root;
</script>

<div class="body">
	<div class="flex flex-col gap-2">
		<h3 class="text-md">Image Dynamic Relocation Table</h3>
		<div class="">
			<table class="table-border-base !w-[min-content] rounded border-zinc-300 dark:!border-zinc-600 [&_*]:!border-inherit">
				<thead>
					<th>Size</th>
					<th>Version</th>
				</thead>
				<tr>
					<td>{data.image_dynamic_relocation_table.size}</td>
					<td>{data.image_dynamic_relocation_table.version}</td>
				</tr>
			</table>
		</div>
		<h3 class="text-md">Entries</h3>
		
	</div>
</div>

<style lang="postcss">
	.body {
	}
</style>
