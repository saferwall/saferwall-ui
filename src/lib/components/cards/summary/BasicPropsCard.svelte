<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import { convertBytes, parseTags } from '$lib/utils';
	import Card from '../../Card.svelte';

	const ingoreProps: string[] = ['Tags', 'Packer', 'TrID'];
	const formatterProps: any = {
		Size: convertBytes
	};

	export let properties: Saferwall.Properties = {};

	$: trid = properties?.TrID!;
	$: packer = properties?.Packer!;
	$: tags = parseTags(properties?.Tags);
</script>

<Card class="rounded-lg">
	<h1 class="card__title">Basic properties</h1>
	<table class="card__list">
		{#each Object.entries(properties) as [key, value]}
			{#if !ingoreProps.includes(key)}
				<tr class="card__item">
					<th class="card__item__title">{key}</th>
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
			{/if}
		{/each}

		{#if packer?.length > 0}
			<tr class="card__item">
				<th class="card__item__title">Packer</th>
				<td class="card__item__content">
					<ul>
						{#each packer as packer}
							<li>
								{packer}
							</li>
						{/each}
					</ul>
				</td>
			</tr>
		{/if}
		{#if trid?.length > 0}
			<tr class="card__item">
				<th class="card__item__title"><span>TrID</span></th>
				<td class="card__item__content">
					<ul>
						{#each trid as trid}
							<li>
								{trid}
							</li>
						{/each}
					</ul>
				</td>
			</tr>
		{/if}
		{#if tags?.length > 0}
			<tr class="card__item">
				<th class="card__item__title">Tags</th>
				<td class="card__item__content">
					<ul class="tags__list">
						{#each tags as tag}
							<li class="tags__tag tags__tag--{tag.category}">
								<a href="/tags/{tag.category}/{tag.name}">{tag.name}</a>
							</li>
						{/each}
					</ul>
				</td>
			</tr>
		{/if}
	</table>
</Card>
