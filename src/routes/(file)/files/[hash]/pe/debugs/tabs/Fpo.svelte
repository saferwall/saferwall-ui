<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { valueToHex } from '$lib/utils';

	export let data: Saferwall.Debug.FPO;

	$: items = Array.isArray(data.info) ? data.info : [];
</script>

{#if items.length > 0}
<div class="[&_*]:border-zinc-300 [&_*]:dark:border-zinc-700">
	<div class="table-border overflow-x-auto">
		<table>
			<thead>
				<th>OffsetStart</th>
				<th>ProcSize</th>
				<th>NumLocals</th>
				<th>ParamsSize</th>
				<th>PrologLength</th>
				<th>SavedRegsCount</th>
				<th>HasSEH</th>
				<th>UseBP</th>
				<th>Reserved</th>
				<th>FrameType</th>
			</thead>
			<tbody>
				{#each items as row}
					<tr>
						<td>{valueToHex(row.offset_start)}</td>
						<td>{valueToHex(row.proc_size)}</td>
						<td>{valueToHex(row.num_locals)}</td>
						<td>{valueToHex(row.params_size)}</td>
						<td>{valueToHex(row.prolog_length)}</td>
						<td>{valueToHex(row.saved_regs_count)}</td>
						<td>{!!row.has_seh}</td>
						<td>{!!row.use_bp}</td>
						<td>{!!row.reserved}</td>
						<td>{valueToHex(row.frame_type)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
{/if}
