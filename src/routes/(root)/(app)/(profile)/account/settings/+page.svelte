<script lang="ts">
	import TabsCard from '$lib/components/cards/TabsCard.svelte';
	import ChangeEmailTab from './tabs/ChangeEmailTab.svelte';
	import InformationTab from './tabs/InformationTab.svelte';
	import ChangePasswordTab from './tabs/ChangePasswordTab.svelte';
	import DeleteTab from './tabs/DeleteTab.svelte';
	import type { PageData } from './$types';

	const menu = [
		{
			title: 'Account information',
			active: true
		},
		{
			title: 'Change email address'
		},
		{
			title: 'Change password'
		},
		{
			title: 'Delete account',
			hideTitle: true
		}
	];

	export let data: PageData;

	$: activeTab = menu[0];
	$: user = data.user!;

	const onTabChange = () => {
		activeTab = menu.find((tab) => tab.active)!;
	};
</script>

<div class="container mx-auto">
	<TabsCard on:change={onTabChange} heading={menu} direction="horizontal">
		<div class="py-4 space-y-4">
			{#if !activeTab.hideTitle}
				<h2 class="font-semibold text-lg">{activeTab.title}</h2>
			{/if}
			{#if activeTab.title === menu[0].title}
				<InformationTab {user} />
			{:else if activeTab.title === menu[1].title}
				<ChangeEmailTab />
			{:else if activeTab.title === menu[2].title}
				<ChangePasswordTab />
			{:else}
				<DeleteTab />
			{/if}
		</div>
	</TabsCard>
</div>
