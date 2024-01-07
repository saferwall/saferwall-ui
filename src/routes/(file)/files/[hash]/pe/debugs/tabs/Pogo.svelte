<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { valueToHex } from '$lib/utils';

	export let item: Saferwall.Debug.POGO;

	$: items = Array.isArray(item.Info?.Entries) ? item.Info?.Entries : [];
</script>

{#if items.length > 0}
	<div class="table-border">
		<table>
			<thead>
				<th>Rva</th>
				<th>Size</th>
				<th>Name</th>
			</thead>
			<tbody>
				{#each items as row}
					<tr>
						<td>{valueToHex(row.Rva)}</td>
						<td>{valueToHex(row.Size)}</td>
						<td>{row.Name}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
