<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import Avatar from './Avatar.svelte';
	import DateTime from './DateTime.svelte';
	import Tags from './Tags.svelte';
	import Card from './Card.svelte';
	import InputHash from './form/InputHash.svelte';

	export let date: number;
	export let title: string;
	export let files: Partial<Saferwall.File>[] = [];
	export let refs: { title: string; url: string }[] = [];

	$: srotedFiles = files.sort((a, b) => a.tags!.length - b.tags!.length);
</script>

<Card>
	<div class="flex items-center space-x-2">
		<Avatar size="md" image="/images/logo-v.webp" />
		<div class="flex flex-col">
			<span>Saferwall</span>
			<DateTime class="text-xs text-neutral-600" {date} />
		</div>
	</div>
	<div class="space-y-4">
		<h2 class="text-lg font-semibold">{title}</h2>
		<ul class="space-y-2">
			{#each srotedFiles as file}
				<li class="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
					<InputHash hash={file.sha256} behavior_id={file.default_behavior_id} />
					<Tags tags={file.tags} />
				</li>
			{/each}
		</ul>
	</div>
	<div class="space-y-2">
		<h3 class="text-base font-semibold">REFERENCES LINK</h3>
		<ul class="space-y-2">
			{#each refs as ref}
				<li>
					<a
						class="text-bluex hover:underline font-medium"
						href={ref.url}
						target="_blank"
						rel="noreferrer">{ref.title}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</Card>
