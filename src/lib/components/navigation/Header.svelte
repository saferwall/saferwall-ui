<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Saferwall } from '$lib/types';
	import { onMount } from 'svelte';

	import Button from '../form/Button.svelte';
	import InputSearch from '../form/InputSearch.svelte';
	import Logo from '../partials/Logo.svelte';
	import UserMenu from '../partials/UserMenu.svelte';
	import ThemeToggle from '../ThemeToggle.svelte';
	import AdvancedSearch from '../AdvancedSearch.svelte';
	
	let mounted = false;
	onMount(() => {
		mounted = true;
	})

	export let user: Saferwall.User | undefined;
	let advanced = false;
	let focused = false;

	$: {
		if (mounted) {
			document.documentElement.classList[advanced ? "add" : "remove"]("overflow-y-clip", "no-scroll-style")
		}
	}
</script>

<AdvancedSearch bind:advanced></AdvancedSearch>
<nav class="text-sm --px-8 bg-neutral-900 w-full shadow-[0px_1px_4px_0px_rgba(13,_13,_13,_0.07)] z-40">
	<div
		class:focused
		class="
		[&.focused_.hide-on-focus]:hidden
		[&:not(.focused)_.show-on-blur]:hidden
		container px-4 mx-auto flex items-center w-full py-5 justify-between relative gap-6"
	>
		<div class="flex items-center gap-3 flex-grow">
			<Logo class="hide-on-focus" />
			<div class="{!focused ? "hidden lg:flex" : "flex"}  --max-w-[680px] flex-grow gap-6 --pr-12">
				<Button
					icon="arrow-left"
					class="show-on-blur text-primary-text border-none hover:bg-transparent px-0"
					iconClass="size-5 mr-2 text-primary-text"
					on:click={() => focused = false}
					>Back</Button
				>
				<InputSearch on:focus={() => (focused = true)} />
			</div>
			<Button icon="advanced-search" class="[&_.content]:gap-2 hidden lg:flex leading-5 p-[15px] hide-on-focus"
				on:click={() => advanced = true}
				>Advanced Search</Button>
		</div>
		<div class="hide-on-focus inline-flex items-center gap-6">
			<ul class="hidden xl:flex gap-6 items-center">
				<li>
					<a
						class="text-secondary-text hover:text-gray-200"
						href="/home" on:click={() => invalidateAll()}>About Saferwall</a
					>
				</li>
				<li>
					<a
						class="text-secondary-text hover:text-gray-200"
						href="https://docs.saferwall.com/"
						target="_blank"
						rel="noreferrer"
					>
						Documentation
					</a>
				</li>
			</ul>
			<Button icon="search" class="size-10 text-secondary-text rounded-full hide-on-focus lg:hidden flex justify-center" on:click={() => focused = true}></Button>
			<Button icon="advanced-search" class="size-10 text-secondary-text rounded-full hide-on-focus lg:hidden flex justify-center" on:click={() => advanced = true}></Button>
			<ThemeToggle />
			{#if user}
				<UserMenu {user} />
			{:else}
				<div class="flex items-center gap-2">
					<div class="!hidden md:!inline-flex">
						<Button class="min-w-[100px] " href="/auth/login">Login</Button>
					</div>
					<Button class="min-w-[100px] " href="/auth/register" theme="brand">
						Sign up
					</Button>
				</div>
			{/if}
		</div>
	</div>
</nav>
