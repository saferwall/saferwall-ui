<script lang="ts">
	import { SaferwallClient } from '$lib/clients/saferwall';
	import type { Saferwall } from '$lib/types';
	import ApiTraceValue from './ApiTraceValue.svelte';

	export let client: SaferwallClient;
	export let behaviorId: string;
	export let hash: string;
	export let procName: string;
	export let pid: string;
	export let tid: string;
	export let trace: Saferwall.Behaviors.ApiTrace.Item;

	let values = trace.values ?? [];

	let loading = false;
	const onBuffLoadEvent = async (index: number) => {
		loading = true;
		try {
			values[index].value.val = await client
				.getFileBuffData({
					hash,
					behaviorId,
					procName,
					pid,
					tid,
					buffId: values[index].value.buf_id
				})
				.then((r) => [...new Uint8Array(r)]);

			values = [...trace.values];
		} catch (error) {
			console.error(error);
		}
		loading = false;
	};
</script>

<div class="relative cursor-auto">
	<table class="w-full">
		<thead>
			<th class="text-tertiary-text font-semibold">Type</th>
			<th class="text-tertiary-text font-semibold">Name</th>
			<th class="text-tertiary-text font-semibold">Value</th>
		</thead>
		<tbody class="divide-y divide-line-sec-surface">
			{#each values as entry, index}
				<tr>
					<td class="{entry.type === "" ? "text-tertiary-text" : ""}">{entry.type || "Unavailable"}</td>
					<td>{entry.name}</td>
					<td>
						<ApiTraceValue {loading} on:load={() => onBuffLoadEvent(index)} {...entry} />
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="postcss">
	table {
		@apply my-2;

		thead {
			@apply text-left;

			th {
				@apply pb-2 ;

				&:nth-child(3) {
					@apply w-full;
				}
			}
		}

		tbody {
			td {
				@apply pr-12 py-[15px] align-top font-regular;
			}
		}
	}
</style>
