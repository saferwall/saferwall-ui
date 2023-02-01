<script lang="ts">
	import ButtonShowAll from '$lib/components/form/ButtonShowAll.svelte';
	import type { Exif } from '$lib/types/summary';
	import { convertBytes } from '$lib/utils/format';
	import BaseCard from '../BaseCard.svelte';

	const maxRecords = 10;
	const formatterProps: any = {
		CodeSize: convertBytes,
		InitializedDataSize: convertBytes
	};

	export let exif: Exif = {};

	$: expanded = false;
	$: items = Object.entries(exif);
	$: activeExpanding = Object.keys(exif)?.length > maxRecords;
</script>

<BaseCard>
	<h1 class="card__title">ExifTool File Metadata</h1>
	<div class="flex flex-col">
		<table class="card__list" class:expanded>
			{#each items as [key, value], i}
				<tr class="card__item" class:hide={!expanded && i > maxRecords}>
					<th class="card__item__title lg:w-80">{key}</th>
					<td class="card__item__content">
						<p>
							{#if formatterProps[key]}
								{formatterProps[key](value)}
							{:else}
								{value}
							{/if}
						</p>
					</td>
				</tr>
			{/each}
		</table>
		{#if activeExpanding}
			<ButtonShowAll on:mouseup={() => (expanded = !expanded)} {expanded} />
		{/if}
	</div>
</BaseCard>
