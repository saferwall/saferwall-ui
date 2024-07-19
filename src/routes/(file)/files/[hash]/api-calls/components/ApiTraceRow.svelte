<script lang="ts">
	import { SaferwallClient } from '$lib/clients/saferwall';
	import type { Saferwall } from '$lib/types';
	import ApiTraceValue from './ApiTraceValue.svelte';

	export let session: Saferwall.Session;
	export let behaviorId: string;
	export let hash: string;
	export let procName: string;
	export let pid: string;
	export let tid: string;
	export let trace: Saferwall.Behaviors.ApiTrace.Item;

	$: values = trace.values ?? [];

	let loading = false;
	const onBuffLoadEvent = async (entry: Saferwall.Behaviors.ApiTrace.Entry) => {
		loading = true;
		try {
			entry.value.val = await new SaferwallClient(session)
				.getFileBuffData({
					hash,
					behaviorId,
					procName,
					pid,
					tid,
					buffId: entry.value.buf_id
				})
				.then((r) => [...new Uint8Array(r)]);

			values = [...trace.values];
		} catch (error) {
			console.error(error);
		}
		loading = false;
	};
</script>

<div class="ml-12 px-4 relative py-2 -mt-7 border-l">
	<table class="w-full">
		<thead>
			<th>Type</th>
			<th>Name</th>
			<th>Value</th>
		</thead>
		<tbody>
			{#each values as entry}
				<tr>
					<td>{entry.type}</td>
					<td>{entry.name}</td>
					<td>
						<ApiTraceValue {loading} on:load={() => onBuffLoadEvent(entry)} {...entry} />
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
				@apply pb-2;

				&:nth-child(3) {
					@apply w-full;
				}
			}
		}

		tbody {
			td {
				@apply pr-12 py-1 align-top;
			}
		}
	}
</style>
