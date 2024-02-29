<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { valueToHex } from '$lib/utils';

	export let data: Saferwall.Debug.POGO;

	$: items = Array.isArray(data.info?.entries) ? data.info?.entries : [];
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
						<td>{valueToHex(row.rva)}</td>
						<td>{valueToHex(row.size)}</td>
						<td>{row.name}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
