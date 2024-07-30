<script lang="ts">
	import { valueToHex } from '$lib/utils';

	export let title: string;
	export let hexValue = true;
	export let items: any[] = [];
</script>

<div class="border rounded space-y-4 p-6">
	<h3 class="text-primary text-lg font-medium">{title}</h3>
	<ul class="space-y-3">
		{#each items as item}
			<li>
				{hexValue ? valueToHex(item) : item}
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	table {
		@apply w-full;

		tbody tr {
			td {
				@apply py-3;

				&:first-child {
					@apply lg:w-1/4 font-medium;
				}
			}
		}
	}
</style>
