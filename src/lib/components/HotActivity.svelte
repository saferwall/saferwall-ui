<script lang="ts">
	import Avatar from './Avatar.svelte';
	import BasicTags from './BasicTags.svelte';
	import BaseCard from './cards/BaseCard.svelte';
	import DateTime from './DateTime.svelte';
	import InputHash from './form/InputHash.svelte';

	export let date: number;
	export let title: string;
	export let files: { hash: string; tags: string[] }[] = [];
	export let refs: { title: string; url: string }[] = [];

	$: srotedFiles = files.sort((a, b) => a.tags.length - b.tags.length);
</script>

<BaseCard>
	<div class="flex items-center space-x-2">
		<Avatar size="medium" image="/images/logo-v.webp" />
		<div class="flex flex-col">
			<span>Saferwall</span>
			<DateTime class="text-sm text-grayx-600" {date} />
		</div>
	</div>
	<div class="space-y-4">
		<h2 class="text-lg font-semibold">{title}</h2>
		<ul class="space-y-2">
			{#each srotedFiles as file}
				<li class="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
					<InputHash hash={file.hash} />
					<BasicTags tags={file.tags} />
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
</BaseCard>
