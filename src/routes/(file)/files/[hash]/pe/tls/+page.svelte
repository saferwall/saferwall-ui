<script lang="ts">
	import { splitCamelCase, valueToHex } from '$lib/utils/format';
	import type { PageData } from './$types';

	export let data: PageData;

	$: items = Object.entries(data.tls.Struct);
	$: callBacks = Object.values(data.tls.Callbacks);
</script>

<article class="space-y-2">
	<h1 class="title">TLS</h1>
	<table class="w-full">
		<tbody>
			<tr>
				<td class="font-semibold text-base">Member</td>
				<td class="font-semibold text-base">Value</td>
			</tr>
			{#each items as [title, value]}
				<tr>
					<td>{splitCamelCase(title)}</td>
					<td>{valueToHex(value)}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="border rounded space-y-4 p-6">
		<h3 class="text-primary text-lg font-medium">Callbacks</h3>
		<ul class="space-y-3">
			{#each callBacks as callBackAddress}
				<li>
					{valueToHex(callBackAddress)}
				</li>
			{/each}
		</ul>
	</div>
</article>

<style lang="scss">
	table {
		@apply w-full;

		tbody tr {
			td {
				@apply py-3;

				&:first-child {
					@apply lg:w-1/4;
				}
			}
		}
	}

	article {
		@apply space-y-4 py-10;

		&:first-child {
			@apply pt-0;
		}
	}
</style>
