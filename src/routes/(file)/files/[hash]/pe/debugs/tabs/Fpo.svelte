<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { valueToHex } from '$lib/utils';

	export let item: Saferwall.Debug.FPO;

	$: items = Array.isArray(item.Info) ? item.Info : [];
</script>

{#if items.length > 0}
	<div class="table-border">
		<table>
			<thead>
				<th>OffStart</th>
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
						<td>{valueToHex(row.OffStart)}</td>
						<td>{valueToHex(row.ProcSize)}</td>
						<td>{valueToHex(row.NumLocals)}</td>
						<td>{valueToHex(row.ParamsSize)}</td>
						<td>{valueToHex(row.PrologLength)}</td>
						<td>{valueToHex(row.SavedRegsCount)}</td>
						<td>{!!row.HasSEH}</td>
						<td>{!!row.UseBP}</td>
						<td>{!!row.Reserved}</td>
						<td>{valueToHex(row.FrameType)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
